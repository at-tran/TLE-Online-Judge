Var L:array[0..1000009] of longint;
	n,i,j:longint;

Function min(a,b:longint):longint;
	Begin
		if a<b then exit(a);
		exit(b);
	End;

BEGIN
	readln(n);

	for i:=0 to n do L[i]:=1000009;
	L[0]:=0;
	for i:=0 to n do
		for j:=1 to 5 do
			L[i+j]:=min(L[i+j], L[i]+1);
	write(L[n]);
END.
