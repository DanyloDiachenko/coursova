import time
import random
import math
import matplotlib.pyplot as plt

def block_sort(arr):
    n = len(arr)
    block_size = int(math.sqrt(n))
    blocks = [arr[i:i + block_size] for i in range(0, n, block_size)]
    for block in blocks:
        block.sort()
    result = []
    for block in blocks:
        result.extend(block)
    result.sort()
    return result

def counting_sort(arr):
    max_val = max(arr); min_val = min(arr)
    range_val = max_val - min_val + 1
    count = [0] * range_val
    output = [0] * len(arr)
    for num in arr:
        count[num - min_val] += 1
    for i in range(1, len(count)):
        count[i] += count[i - 1]
    for num in reversed(arr):
        output[count[num - min_val] - 1] = num
        count[num - min_val] -= 1
    return output

def radix_sort(arr):
    max_val = max(arr); exp = 1
    while max_val // exp > 0:
        counting_sort_by_digit(arr, exp)
        exp *= 10
    return arr

def counting_sort_by_digit(arr, exp):
    n = len(arr)
    output = [0] * n
    count = [0] * 10
    for i in range(n):
        count[(arr[i] // exp) % 10] += 1
    for i in range(1, 10):
        count[i] += count[i - 1]
    for i in range(n-1, -1, -1):
        idx = (arr[i] // exp) % 10
        output[count[idx] - 1] = arr[i]
        count[idx] -= 1
    for i in range(n):
        arr[i] = output[i]

def flash_sort(arr):
    n = len(arr)
    if n <= 1: return arr
    mn, mx = min(arr), max(arr)
    if mn == mx: return arr
    m = max(2, int(0.45 * n))
    class_count = [0] * m
    scale = (m-1) / (mx - mn)
    for v in arr:
        class_count[int((v - mn) * scale)] += 1
    for i in range(1, m):
        class_count[i] += class_count[i-1]
    arr_copy = arr.copy()
    for v in arr_copy:
        k = int((v - mn) * scale)
        class_count[k] -= 1
        arr[class_count[k]] = v
    for i in range(1, n):
        j = i
        while j > 0 and arr[j-1] > arr[j]:
            arr[j-1], arr[j] = arr[j], arr[j-1]
            j -= 1
    return arr

def generate_array(size):
    return [random.randint(10, 1000) for _ in range(size)]

# Основні розміри
sizes = [500, 1000, 2000, 5000, 10000, 25000, 50000]

# Зберігаємо часи в мс
times = {name: [] for name in ('block_sort','counting_sort','radix_sort','flash_sort')}

for size in sizes:
    arr = generate_array(size)
    start = time.time()
    block_sort(arr.copy())
    times['block_sort'].append((time.time() - start)*1000)
    start = time.time()
    counting_sort(arr.copy())
    times['counting_sort'].append((time.time() - start)*1000)
    start = time.time()
    radix_sort(arr.copy())
    times['radix_sort'].append((time.time() - start)*1000)
    start = time.time()
    flash_sort(arr.copy())
    times['flash_sort'].append((time.time() - start)*1000)

print(f"{'Розмір':>8}\t{'Блочне':>8}\t{'Підрахунком':>12}\t{'Порозрядне':>12}\t{'Флеш':>6}")
for sz, b, c, r, f in zip(sizes,
                          times['block_sort'],
                          times['counting_sort'],
                          times['radix_sort'],
                          times['flash_sort']):
    print(f"{sz:8d}\t{b:8.2f}\t{c:12.2f}\t{r:12.2f}\t{f:6.2f}")