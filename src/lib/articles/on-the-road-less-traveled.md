---
title: on the road less traveled
date: 2026-10-28
lastModified: 2026-10-28
tag: technology
---

<script>
	import EnhancedImage from "#lib/components/ui/EnhancedImage.svelte";
	import tidal from "#lib/articles/on-the-road-less-traveled/tidal-memory-exo-cover.jpeg?enhanced";
	import throbber from "#lib/articles/on-the-road-less-traveled/loading-throbber.png?enhanced";
	import nav from "#lib/articles/on-the-road-less-traveled/v-nav.png?enhanced";
	import dynamic from "#lib/articles/on-the-road-less-traveled/dynamic.png?enhanced";
	import ds2 from "#lib/articles/on-the-road-less-traveled/ds2.jpg?enhanced";
	import twofold from "#lib/articles/on-the-road-less-traveled/twofold.jpg?enhanced";
	import crumpler from "#lib/articles/on-the-road-less-traveled/crumpler.png?enhanced";
</script>

He who awaits the perfect JavaScript framework shall never ship a project, or at least I think that's how the passage goes...

Most computer science courses these days cover a core set of 'employable' languages: React, JavaScript, SQL, and if you're doing data science, Python. These are _fair_ options as universities function primarily as a means to create skilled knowledge workers, but sometimes you can gain far more by learning for the sake of learning than whatever the current trend is. Nowhere was this more apparent than a recent web development unit at university which focused on React and other convenient solutions such as Vercel.

Don't get me wrong, React is popular for a reason: big ecosystem, plentiful learning resources, jobs, yeah yeah. But given the opportunity, it would not have been my first choice, nor do I believe that many people go out of their way to learn it because they just _really_ love React. There had to be more elegant ways to develop for the web, ones that avoided boilerplate and focused on the site itself (the HTML), rather than odd framework abstractions.

So around 6 months ago I decided to try and build **this** site. At the time I had some vague inklings of potential technologies which promised to solve these issues — SolidJS, Vue.js, Angular, or what many of my friends use, Astro — but was stuck thinking "What if I pick the wrong framework?"

In retrospect, this was a silly question. We've all fallen for what I believe is fear masquerading as procrastination; it's very easy to conflate searching for the perfect language or technology with actually _creating_ the project — it doesn't exist.

---

## pain points

One of the things that really annoys me about frameworks such as React is that they commit the cardinal sin for junior developers: boilerplate. Forcing beginners to grapple with foundational programming concepts _and_ language/framework abstractions is simply too much all at once. It may have been for this reason that up until recently C was the foundation of any development course, as it enables you to work _up_ to other language/framework abstractions, rather than the other way around.

A good example was my first attempt at the `<canvas>` element. My idea was to have a matrix-style randomised pattern of 1's and 0's cycling as the background for the hero element. Initially I tried applying those basic C skills to the problem: "So if we want to print a random pattern of say, 10,000 characters, we just need to define a string and print it a few hundred times."

Well that was simple... right?

```ts
// This is pseudocode, check the site repo if you want the real script

// 1. We define the shape/style of the characters we want to paint
ctx.font = "14px monospace";
ctx.fillStyle = "#00FF00";
ctx.textBaseline = "top";

// 2. Spam '0' and '1' a few times to make a seemingly random string
const chars = "010110010011101000101101001";

function draw() {
	// 3. Clean the previous paint on the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 4. Loop for every row (until the bottom of the screen)
	for (let row = 0; row < rows; row++) {
		// 5. Loop for every column (until the edge of the screen)
		for (let col = 0; col < columns; col++) {
			// 6. Calculate where to paint the strings
			let xPos = col * stringWidth;
			let yPos = row * rowHeight;

			// 7. Paint the strings at that spot
			ctx.fillText(chars, xPos, yPos);
		}
	}
}
// And then randomise the pattern 4 times per second to animate it :D
```

HAH!

What a disaster.

While the characters did _appear_, this has to be one of the most unoptimised pieces of poop I've ever written. By using `ctx.fillText` we are essentially instructing the CPU to measure, draw, and loop tens of thousands of characters every single frame, bringing even my MacBook Pro to its knees. Window resizing was even worse, as the canvas had to recalculate its size and re-paint every character for every possible frame.

I had to dig deeper and pull out my inner Casey Muratori — optimise, optimise, optimise. What we needed to do was work _up_ to the language abstraction; by applying those basic C concepts we quickly understood where the performance issue was.

This time, instead of forcing the browser to calculate each character from a font set and *then* painting it tens of thousands of times, we were simply going to build a huge printing press.

```ts
// This is pseudocode, check the site repo if you want the real script

// 1. Create TWO canvases this time
let canvas; // Main canvas for stamping (ctx)
let offscreen; // The other canvas for painting (oCtx)

// 2. We define the shape/style of the characters we want to paint
oCtx.font = "14px monospace";
oCtx.fillStyle = "#00FF00";
oCtx.textBaseline = "top";

// 3. Paint the characters ONLY ONCE on the offscreen canvas
function generateOffscreen() {
	oCtx.fillText("0", 0, 0);
	oCtx.fillText("1", spriteWidth, 0);
}

function draw() {
	// 4. Clean the previous paint on the main canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// 5. Loop for every row (until the bottom of the screen)
	for (let row = 0; row < rows; row++) {
		// 6. Loop for every column (until the edge of the screen)
		for (let col = 0; col < columns; col++) {

			// 7. Randomly decide on using the 1 or 0 stamp
			const isOne = Math.random() > 0.5;

			// 8. Calculate where to stamp the char
			const dx = col * spriteWidth;
			const dy = row * rowHeight;

			// 9. Stamp the char at that specific spot
			ctx.drawImage(offscreen, sx, 0, spriteWidth, rowHeight, dx, dy, spriteWidth, rowHeight);
		}
	}
}

// And then repeat this 4 times per second to animate the effect :D
```

Check out the actual script at [github.com/krausc2](https://github.com/krausc2/krausc2.dev/blob/main/src/lib/BinaryCanvas.svelte).

Now was this an unorthodox way to learn?

Absolutely, and that's why I remember every excruciating detail but couldn't give you the first instruction on how to init a React project...

---

## and the paint!

Everyone else is already using AI to build whatever they can dream of, so what makes your site so special?

One of my guilty pleasures is to constantly screw around with the CSS of this site; learning Tailwind was a great opportunity to bring many of my inspirations to life. Each source could warrant its own article, but hopefully these condensed versions do them justice:

### 1. iglooghost.net

The first was [iglooghost.net](https://iglooghost.net/), the website for music and visual artist Iglooghost.

I'd been a fan of Iglooghost ever since stumbling upon Tidal Memory Exo, an album that's quite hard to describe in words alone. What can be said though is that it takes you on a wholly engrossing journey, with an accompanying alternate reality game (ARG) site for each album.

<EnhancedImage
	src={tidal}
	alt="Tidal Memory Exo album art"
/>

More important though, is how these sites break almost every UI and UX convention, yet look better for it. Take [exoportal.xyz](https://exoportal.xyz/) for example, the site that accompanies Tidal Memory Exo. A slightly controversial choice — loading screens. Each page appears to transfer resources in the background behind a spinner, kind of like a loading screen in a video game.

<EnhancedImage
	src={throbber}
	alt="Screenshot of throbber loading screen"
/>

This directly influenced my decision to prevent articles and projects from displaying until resources were ready, allowing the smooth cascading animation without any pop-in.

Navigation also diverges from the norm by placing sub-pages in a vertical bar rather than a typical horizontal form.

<EnhancedImage
	src={nav}
	alt="Screenshot of vertical navigation bar"
/>

I adapted this slightly and cleaned it up for the minimalist aesthetic (not to say the original is worse in any way).

You may notice the inclusion of little dynamic elements across my site such as the article/project count and age timer, which was also inspired by Iglooghost.

<EnhancedImage
	src={dynamic}
	alt="Screenshot of dynamic elements"
/>

This came from the page for the album Bronze Claw Iso, [neurowaste.net](https://neurowaste.net/), and also the main home site which is covered in these details.

If you have an open mind and an hour to spare, it's definitely worth picking apart these designs.

### 2. Death Stranding (Series)

[Death Stranding](https://www.kojimaproductions.jp/en/death-stranding-dc) is an open-world story game created by the much-acclaimed Hideo Kojima. It sets you on a journey as a courier across the continental United States (and later Australia) following a cataclysmic event that leaves the nation shattered into remote cities and outposts.

Death Stranding's UI is remarkably cold and sterile, which is quite fitting for a world that is equally cold and sterile.

<EnhancedImage
	src={ds2}
	alt="Screenshot of Death Stranding 2 UI"
/>

What's interesting here is how something as mundane as a video game UI can be used to evoke an emotional response from the viewer. Since most of my site was already quite sterile and developer-focused, I opted for the opposite of Death Stranding, warm stone and orange tones (from Shadcn). This extended to animations across all elements, which snap on in a responsive manner, but release much more slowly. Ultimately this turns an otherwise boring UI into something that feels a little more _round_ and _cozy_.

### 3. Two Fold Pt. 2 (Album)

There exists a quote from an interlude on ["Two Fold, Pt. 2" (2016) by Haywyre](https://www.haywyremusic.com/music/two-fold-pt-2/) called "Restraint". It goes:

> "Absence is the absence of presence, but presence is the absence of absence."

<EnhancedImage
	src={twofold}
	alt="Screenshot of Two Fold Pt. 2 album art"
/>

Often what makes art so powerful is absence, as absence creates space to breathe (here absence just means white space). Keeping this in the back of my mind acted almost like an antidote to feature creep or the beginner urge to overdo everything. While having an AI companion ready and willing to _slop_ out ideas drastically improves the pace of development, it's akin to handing a monkey a shotgun.

What worked better was to write these ideas down as dispersed `#TODO` notes. Then if something **really** felt too empty, I would go back and pick out only the best things, remembering to respect that white space.

### 4. crumpler.com

So what happens when you put the concept of absence into practice? Well, you might end up with a site like [crumpler.com](<https://www.crumpler.com>). It takes the concept to an extreme, almost like some kind of legacy Web 1.0 site (which is a really cool thing).

There isn't really any philosophical conviction here, the design is just genuinely cool.

<EnhancedImage
	src={crumpler}
	alt="Screenshot of Crumpler website"
/>

You'll notice a few interesting elements such as the Crumpler logo, which has an interactive physics engine, old-school serif fonts that look out of place for a youthful brand yet somehow still work, and a seriously cool 3D LiDAR scan feature.

---

## in closing

It's quite amazing how quickly you can pick up programming and architectural patterns when you just go out and create things. And while the code written a week ago disgusts me, it's exactly this kind of discomfort that proves you're moving forwards, even if it's difficult to tell in the moment.

What I've found is that trying to learn the "right" employable skills can actually make you a worse learner, while building for fun forces you to learn deeply because you're actually invested in the end result. In what world does a React-based university course teach you how to draw inspiration from 2D sprite rendering, a backpack brand, a video game about shipping packages across America, prehistoric angel trilobites, and a future bass album? It can't, and never will.

Probably around half this site is still missing with dozens of broken features, but you're on it, it feels nice, and it's mine.
