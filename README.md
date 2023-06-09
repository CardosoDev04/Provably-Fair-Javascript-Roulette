# How does it work?
This is a simple horizontal roulette spinner, in which the outcome is randomly generated by a Provably Fair system using client and server seeds and SHA-256 encryption. The visual part of the roulette was forked from another user listed in the license part of this software. 

It includes a balance system to which you can add balance by inputing the amount you want and a betting system, so that when you roll the bet amount will be subtracted from your balance until the roll ends. If you get the color right you get your balance back multiplier by the color's multiplier, else you'll loose the amount you bet.

When you click to spin the wheel, the server generates a public seed ( which it presents right away ) and a private seed (shown at the end of the roll).
The server grabs these seeds, joins them and shuffles them. After shuffling, they will be hashed using SHA-256 encryption to generate the Outcome hash.

The server will then grab the first 8 digits of the outcome hash and parse them as a number. It then divides the number by the number of cards and the modulo of that will be our result number.

The user can verify each roll at the end with the outcome hash, so it's provably fair and completely random.

## Important Notes

This project is still being worked on and is part of a bigger future project I'm working on.
If you use this, ask me first or at least give me some credit.

