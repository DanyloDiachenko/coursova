import time
import random
import math
import heapq
import matplotlib.pyplot as plt

def block_sort(arr):
    n = len(arr)
    b = int(math.sqrt(n)) or 1
    blocks = [arr[i:i+b] for i in range(0, n, b)]
    for block in blocks:
        for i in range(1, len(block)):
            key = block[i]
            j = i-1
            while j >= 0 and block[j] > key:
                block[j+1] = block[j]
                j -= 1
            block[j+1] = key
    heap = []
    for bi, block in enumerate(blocks):
        if block:
            heapq.heappush(heap, (block[0], bi, 0))
    res = []
    while heap:
        val, bi, idx = heapq.heappop(heap)
        res.append(val)
        if idx+1 < len(blocks[bi]):
            heapq.heappush(heap, (blocks[bi][idx+1], bi, idx+1))
    return res

def counting_sort(arr):
    mn, mx = min(arr), max(arr)
    cnt = [0]* (mx-mn+1)
    for x in arr:
        cnt[x-mn] += 1
    out = []
    for i, c in enumerate(cnt):
        out.extend([i+mn]*c)
    return out

def radix_sort(arr):
    if not arr: return arr
    mn, mx = min(arr), max(arr)
    shift = -mn if mn<0 else 0
    a = [x+shift for x in arr]
    exp = 1
    while exp <= max(a):
        cnt = [0]*10
        for x in a:
            cnt[(x//exp)%10] += 1
        for i in range(1,10):
            cnt[i] += cnt[i-1]
        out = [0]*len(a)
        for x in reversed(a):
            d = (x//exp)%10
            cnt[d] -= 1
            out[cnt[d]] = x
        a = out
        exp *= 10
    return [x-shift for x in a]

def flash_sort(arr):
    n = len(arr)
    if n==0: return arr
    mn = mx = arr[0]
    for x in arr:
        if x<mn: mn=x
        if x>mx: mx=x
    if mn==mx: return arr[:]
    m = int(0.45*n) or 1
    l = [0]*m
    c = (m-1)/(mx-mn)
    for x in arr:
        l[int((x-mn)*c)] += 1
    for i in range(1,m):
        l[i] += l[i-1]
    a = arr[:]
    res = [None]*n
    for x in reversed(a):
        k = int((x-mn)*c)
        l[k] -= 1
        res[l[k]] = x
    for i in range(1,n):
        key = res[i]
        j = i-1
        while j>=0 and res[j]>key:
            res[j+1] = res[j]
            j -= 1
        res[j+1] = key
    return res

def measure(fn, arr, repeats=10):
    total = 0.0
    for _ in range(repeats):
        tmp = arr[:] 
        st = time.perf_counter()
        fn(tmp)
        total += time.perf_counter() - st
    return (total/repeats)*1000

sizes = [500, 1000, 2000, 5000, 10000, 25000, 50000]
results = {'Block':[], 'Counting':[], 'Radix':[], 'Flash':[]}

for n in sizes:
    arr = [random.randint(0,100000) for _ in range(n)]
    results['Block'].append(  measure(block_sort, arr) )
    results['Counting'].append(measure(counting_sort, arr))
    results['Radix'].append(   measure(radix_sort, arr))
    results['Flash'].append(   measure(flash_sort, arr))

print(f"{'       N':>8} | {'Block(ms)':>9} | {'Counting(ms)':>12} | {'Radix(ms)':>9} | {'Flash(ms)':>9}")
print('-'*60)
for i, n in enumerate(sizes):
    b = results['Block'][i]
    c = results['Counting'][i]
    r = results['Radix'][i]
    f = results['Flash'][i]
    print(f"{n:8d} | {b:9.2f} | {c:12.2f} | {r:9.2f} | {f:9.2f}")

sizes_plot = [0] + sizes
for key in results:
    results[key] = [0.0] + results[key]

plt.figure(figsize=(8,5))
for name, col in zip(results, ['tab:blue','tab:orange','tab:green','tab:red']):
    plt.plot(sizes_plot, results[name], marker='o', label=name, color=col)

plt.xlabel('Кількість елементів')
plt.ylabel('Час сортування (мс)')
plt.title('Порівняння алгоритмів сортування')
plt.xlim(0, sizes[-1])
plt.ylim(0, None)
plt.xticks(sizes)
plt.grid(True, ls='--', alpha=0.5)
plt.legend()
plt.tight_layout()
plt.show()
