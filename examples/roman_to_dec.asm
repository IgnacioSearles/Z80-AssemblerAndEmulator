start:
ld IX, num_in_roman             ;set IX pointing at last char in input string

ld D, 0
ld E, num_in_roman_len

add IX, DE

ld C, 0

loop_through_num:               ;each loop through each char in input backwards, if char is 0 then save output
dec IX
ld A, (IX)                          ;ld char into A

cp 0
jp Z, save_num_to_mem               ;check if char is 0

ld IY, roman_chars                  ;load pointer to list of roman chars into IY and use E as index
ld E, 255
ld D, 0

compare_to_roman_chars:         ;foreach char in input string compare if equals to char 
ld B, (IY)
inc IY
inc E

cp B
jp NZ, compare_to_roman_chars

ld HL, roman_chars_vals         ;load matching char value into E 
add HL, DE                       

ld E, (HL)

ld A, (last_num)                ;if equals then check if is larger than last num in roman number (to check cases like IV)

cp E
jp M, add_num_to_sum
jp Z, add_num_to_sum

ld A, C                        ;if number is smaller than last roman char then sub to total
sub E
jp save_sum_in_c

add_num_to_sum:                ;if number is greater or equal to last roman char then add to total
ld A, C
add A, E

save_sum_in_c:                 ;total is saved in C
ld C, A

ld A, E                        ;update last number
ld (last_num), A

jp loop_through_num

save_num_to_mem:               ;save output to mem
ld A, C
ld (output), A

rst 38h

end start

output: db 0

db 0
num_in_roman: defm "IV" 
num_in_roman_len: equ $ - num_in_roman

last_num: db 0

roman_chars: defm "IVXLC"
db 0

roman_chars_vals: db 1, 5, 10, 50, 100
