org 0h

start:
ld B, 0
ld D, 1                  ;save amount of shifts per loop in D
ld E, 0                  ;use E to hold result

ld IX, input_string      ;load pos of end of input + 1 into IX

loop:
dec IX

ld A, (IX)               ;load char into A

cp 0                     ;if reach start of input end
jp Z, end_loop

sub 30h                  ;ascii "0"/"1" -> decimal

ld B, D                  ;load necesarry shifts into B                  

shift_a:
sla A                    ;shift number to add
djnz shift_a

inc D                    ;increment shifts for next loop

ld C, A                  ;load number into C
ld A, E                  ;load result into A

add A, C                    ;add number into result
ld E, A
jp loop                     ;next char

end_loop:
ld A, E
srl A                       ;shift right
ld (result), A              ;save result

rst 38h                     ;halt

end start                   ;start execution in start label

result: db 0                
db 0                        ;start input with 0, "null started"
defm "1000101"
input_string:               ;load end + 1 of input_string
