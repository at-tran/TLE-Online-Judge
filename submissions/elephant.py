n = int(input())

L = [1000009 for i in range(n+9)]
L[0] = 0

for i in range(n+1):
	for j in range(1,6):
		L[i+j] = min(L[i+j], L[i]+1)

print(L[n])
