org 0h

start:
ld B, 0
ld D, 1
ld E, 0

ld IX, input_string

loop:
dec IX

ld A, (IX)

cp 0
jp Z, end_loop

sub 30h 

ld B, D 

shift_a:
sla A
djnz shift_a

inc D

ld C, A
ld A, E

add A, C
ld E, A
jp loop

end_loop:
ld A, E
srl A
ld (result), A

int 80h

end start

result: db 0
db 0
defm "11011"
input_string:
