org 10

start:
ld SP, stack

ld B, 5
ld C, 2

push BC
call divide

ld (result), A
int 80h

divide:
pop DE
pop BC

ld A, B
ld B, 0

loop:
cp C
jp M, done

sub C
inc B
jp loop

done:
ld A, B

push DE
ret

ds 20
stack:
result: db 0
