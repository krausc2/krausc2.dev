const MS_PER_SPLASH = 12000;

/*
	#TODO Fix page resume animation. Browser optimisation causes animation
	to sleep or slow down when inactive (?).
	#TODO Add check for selection of the same splash twice in a row.
*/

/*
	Unclassified
*/

const SPLASHES: { day: [string, string][]; night: [string, string][] } = {
	day: [
		["It is a profound moral failing to choose luxury over lineage.", "Original thought."],
		[
			"And they say that life has no meaning.",
			'From "Jinsei no Tobira" on "Denim" (2007) by Mariya Takeuchi.'
		],
		[
			"Don't let the fire rush to your head.",
			'From "Eye in the Sky" on "Eye in the Sky" (1982) by The Alan Parsons Project.'
		],
		["Any computer is a laptop if you're strong enough.", "Standard cliche."],
		[
			"Clippy just wanted to help.",
			'From "Change your profile picture to clippy. I\'m serious." (2025) by Louis Rossmann.'
		],
		["See my latest project at localhost:5173/", "It works on my machine; standard cliche."],
		[
			"To err is human; to forgive, divine.",
			'From "An Essay on Criticism" (1711) by Alexander Pope.'
		],
		["Hello world!", "Do CS50 to figure it out; standard cliche."],
		["As you start to walk on the way, the way appears.", "Quote (13th c.) by Rumi."],
		["Vibe coding? Prompt engineering.", "Original thought."],
		[
			"Underestimation never stopped a pigeon from unlatching itself or being old.",
			'From "I Find Myself Defending Pigeons" (2019) by Keith S Wilson.'
		],
		["git push --force", "Don't do this one please 🙏; standard cliche."],
		[
			"He who awaits the perfect JavaScript framework shall never ship a project.",
			"Adapted from Ecclesiastes 11:4; original thought."
		],
		[
			"A commissioner wearing his sash is no longer a man but a statue of the law.",
			'From "The Count of Monte Cristo" (1844) by Alexandre Dumas.'
		],
		[
			"Don't dream of things that will make reality even more terrible to you.",
			'From "The Count of Monte Cristo" (1844) by Alexandre Dumas.'
		],
		["You finished it, and that's all that matters.", "Original thought."],
		["Made with Svelte ♥", "Original thought."],
		[
			"An idiot admires complexity. A genius admires simplicity.",
			"Quote (21st c.) by Terry A. Davis."
		],
		[
			"Gleep glorp gloop glurp gleep. - The Aliens, probably.",
			"Unfortunately an original thought."
		],
		[
			"Knowing what is to come does not prevent it from coming.",
			"A warning against complacency and to act upon gained knowledge; original thought."
		],
		["AI is a statistical mirror; It is the ultimate conformist.", "Original thought."],
		["3000? All my homies use 5173.", "Default port for React vs Svelte; original thought."],
		[
			"Real things are messy and living.",
			"Create in the open and embrace imperfection; original thought."
		],
		["Don't touch the CSS, it's still wet.", "Standard cliche."],
		[
			"Is it better for a man to have chosen evil than to have good imposed upon him?",
			'From "A Clockwork Orange" (1962) by Anthony Burgess.'
		],
		[
			"The truth is... the game was rigged from the start.",
			'From "Fallout: New Vegas" (2010) by Obsidian Entertainment.'
		],
		[
			"It is not enough to be industrious; so are the ants.",
			"Quote (1857) by Henry David Thoreau."
		],
		[
			"Be the tree, whose shade you shall never live to sit in.",
			"Unknown origin; variation of standard cliche."
		],
		[
			"You will regret your inactions the most.",
			"Not a threat, but a call to action; original thought."
		],
		["Memento mori.", "Latin quote (3rd to 1st c. BC) unknown origin."],
		["640x480. Just as God intended.", "Quote (21st c.) by Terry A. Davis."],
		[
			"I'm still gonna try, if only 'cause I like the way it feels.",
			'From "Sing Good" on "I Love My Computer" (2025) by Ninajirachi.'
		],
		[
			"Reach for the stars, so if you fall, you land on a cloud.",
			'From "Homecoming" on "Graduation" (2007) by Kanye West.'
		],
		["A wolf goes hungry sometimes, but it answers to no one.", "Standard cliche."],
		[
			"Sometimes we have to engage with things that we don’t like.",
			"Very few people are actually open minded; original thought."
		],
		["To be cringe is to be free.", "Live your life authentically; original thought."],
		[
			"Life is a war against entropy.",
			'"Entropy" meaning the tendency towards disorder and chaos over time; original thought.'
		],
		[
			"He who has a 'why' to live for can bear almost any 'how'.",
			'From "Twilight of the Idols" (1889) by Friedrich Nietzsche.'
		],
		[
			"A lot of people don't appreciate their moment until it's passed.",
			"Quote (2005) by Kanye West."
		],
		[
			"You are the common denominator in life.",
			"Know that sometimes it is your fault; original thought"
		],
		[
			"We can be a little too rough on our hearts; It’s all for nothing.",
			'From "All For Nothing" on "Butterfly Effect" (2021) by Koven.'
		],
		[
			"I’m exactly where I wanna be, but I’m a long way from home.",
			'From "Bones" on "Once in a Long, Long While" (2017) by Low Roar.'
		],
		[
			"Flee the comfortable misery of the known.",
			"Convenience is overrated and often destructive; original thought."
		],
		[
			"Keep going, keep going, keep going, keep going. It will all be OK.",
			'From "Mirror" on "Nurture" (2021) by Porter Robinson.'
		],
		[
			"The pursuit of excellence needs no explanation.",
			"Only at the end of an age will others understand your drive; original thought."
		],
		[
			"'The Cloud' is just someone else's computer.",
			"You should host your own stuff; standard cliche."
		],
		[
			"You can't engineer solutions for a team that only wants to go shopping.",
			"Original thought."
		],
		["Your smart fridge is spying on you.", "Okay but really, it is; standard cliche."],
		[
			"I'm not a big fan of the internet, that's why I went into cyber security.",
			"Quote (2026) by Dr Helen Teixeria."
		],
		[
			"LARP like your life depends on it.",
			'Adapted from "fake it till you make it"; original thought.'
		],
		["Look up, it's free.", "Enjoy God's creation for what it is; original thought."],
		["【=◈︿◈=】", 'From "Worlds" (2014) by Porter Robinson; kanomoji/logo.'],
		[
			"Society has become far too okay with accepting preventable tragedies.",
			"What was once shocking occurs in the streets daily; original thought."
		],
		["Orwell was an optimist.", "Standard cliche."],
		["To understand recursion, one must first understand recursion.", "Standard cliche."]
	],
	night: [
		[
			"I promise you it's alright, this all means we're still alive.",
			'From "HeavenPiercingRounds" on "It\'s Your Life" (2026) by thayerperiod.'
		],
		[
			"What suffering can a young person really experience?",
			'Quote (1983) by Unknown Man from KBS "Finding Dispersed Families".'
		],
		[
			"I'm just a child, I lost track of time.",
			'From "just a child" on "Strung Out Symphony" (2025) by aldn.'
		],
		["The best code is written at 2am.", "Original thought."],
		[
			"No one is more stressed than a 20y/o who thinks they're out of time.",
			"Literally; original thought."
		],
		[
			"It's later than you think, therefore hasten to do the work of God.",
			"Quote (2025) by John Maus."
		],
		[
			"Never run down the clock.",
			"As opposed to the sporting concept of running down the clock;  original thought."
		],
		[
			"Tyranny exercised for the good of its victims may be the most oppressive.",
			'From "God in the Dock: Essays on Theology" (1970) by C. S. Lewis.'
		],
		[
			"Don't kill yourself, you idiot.",
			'From "Russian Roulette" on "SMILE! :D" (2025) by Porter Robinson.'
		],
		[
			"The valiant never taste of death but once.",
			'From "Julius Caesar" (1599) by William Shakespeare.'
		], // S2
		[
			"Cowards die many times before their deaths.",
			'From "Julius Caesar" (1599) by William Shakespeare.'
		], // S1
		[
			"All my life I've been young, so I never get a turn.",
			"Quote by Timothée Chalamet in Prodigal Son (2016)."
		],
		[
			"As if I'm ever gonna change.",
			'From "as if" on "i care so much that i don\'t care at all" (2023) by Glavie.'
		],
		["You're gonna die either way, so hurry up.", "Positive nihilism; original thought."],
		["8 hours of sleep is recommended for optimal performance.", "Standard cliche."],
		["The glowies are asleep.", "Standard cliche."],
		[
			"Unequal efforts mandate unequal rewards.",
			"Not in the sense of equality, but rather the natural order of things; original thought."
		],
		[
			"Inequality is required to motivate men to greatness.",
			"Without the inequal, the exceptional would cease to exist; original thought."
		],
		["Were you expecting a dark mode?", "Original thought."]
	]
};

export const SPLASHES_DATA = SPLASHES;

export function createSplash(includeNight: boolean = false) {
	let value = $state("");
	const splashObjects = includeNight ? [...SPLASHES.day, ...SPLASHES.night] : SPLASHES.day;
	const splashes = splashObjects.map((s) => s[0]);
	const longestValue = splashes.reduce((a, b) => (a.length > b.length ? a : b));

	$effect(() => {
		let tick = Math.floor(Math.random() * splashes.length);

		value = splashes[tick];

		const interval = setInterval(() => {
			tick = Math.floor(Math.random() * splashes.length);
			value = splashes[tick];
		}, MS_PER_SPLASH);

		return () => clearInterval(interval);
	});

	return {
		get value() {
			return value;
		},
		get longestValue() {
			return longestValue;
		}
	};
}
