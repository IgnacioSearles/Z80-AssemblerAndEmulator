org 2                   ;Start position of instructions

divide:                 ;Divide subrutine
pop DE                  ;pop return address
pop BC                  ;store dividend in B and divisor in C
push AF                 ;save accumulator/flags

ld A, B                 ;load dividend into A
ld B, 0                 ;set quotient to 0

loop:                   
cp C                    ;check if divisor is bigger than dividend
jp M, done

sub C                   ;if dividend is bigger than divisor subtract and increment quotient
inc B
jp loop

done:
ld (remainder), A      ;if divisor is bigger than dividend save remainder and quotient to mem
ld A, B
ld (result), A

pop AF                 ;restore accumulator/flags and return
push DE
ret

start:
ld SP, stack           ;initialize stack

ld B, 89               ;dividend
ld C, 7                ;divisor

push BC                ;call divide subrutine
call divide

rst 38h                ;stop execution

end start              ;PC starts at start tag

result: db 0
remainder: db 0
ds 20
stack:
