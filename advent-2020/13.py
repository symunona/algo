def egcd(a, b):
    if a == 0:
        return (b, 0, 1)
    else:
        g, y, x = egcd(b % a, a)
        return (g, x - (b // a) * y, y)

def modinv(a, m):
    g, x, y = egcd(a, m)
    if g != 1:
        raise Exception('modular inverse does not exist')
    else:
        return x % m


def modular_multiplicative_inverse(a: int, m: int) -> int:
    # ref: https://docs.python.org/3/whatsnew/3.8.html
    return modinv(a, m)

def chinese_remainder_theorem_solver(divisors_and_remainders: list) -> int:
    # 1. Get product of all divisors

    product = 1
    for divisor, _ in divisors_and_remainders:
        product *= divisor

    total = 0
    for divider, remainder in divisors_and_remainders:
        # 2. Get partial product of each divisor

        partial_product = product // divider

        # 3. Find out the Modular multiplicative inverse of "partial_product" under modulo "divisor"

        inverse = modular_multiplicative_inverse(partial_product, divider)

        # 4. Adding the result product

        total += remainder * partial_product * inverse

    # 5. Return the smallest solution

    return total % product


def part1(data):
    timestamp, bus_ids = data

    earliest_bus_id = None
    earliest_departure_time = float('inf')

    for bus_id in bus_ids:
        if bus_id < 0:
            continue

        departure_time = timestamp + bus_id - (timestamp % bus_id)

        if departure_time < earliest_departure_time:
            earliest_departure_time = departure_time
            earliest_bus_id = bus_id

    return (earliest_departure_time - timestamp) * earliest_bus_id


def part2(data):
    timestamp, bus_ids = data

    divisors_and_remainders = [
        (bus_id, bus_id - ix)
        for ix, bus_id in enumerate(bus_ids)
        if not bus_id < 0
    ]

    return chinese_remainder_theorem_solver(divisors_and_remainders)


def extract_data(lines) -> (int, list):
    timestamp = int(lines[0])

    bus_ids = []
    for i in lines[1].split(','):
        if i == 'x':
            bus_ids.append(-1)
        else:
            bus_ids.append(int(i))

    return timestamp, bus_ids


with open('./13t.in') as f:
    inputs = [
        line
        for line in f.read().splitlines()
    ]

    print(part1(extract_data(inputs)))
    print(part2(extract_data(inputs)))
