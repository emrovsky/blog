import {stripIndent} from 'common-tags';
import {Highlighter} from '../../../client/components/highlighter';
import {Post} from '../../Post';
import image1 from './1.png';
import image2 from './2.png';
import image3 from './3.gif';
import image4 from './4.png';
import image5 from './5.png';
import image6 from './6.png';
import image7 from './7.png';
import image8 from './8.png';
import image9 from './9.png';

import {Note} from '../../../client/components/note';



export class Castle extends Post {
	public name = 'Castle Antibot Reverse Engineered';
	public slug = 'castle-antibot-reversed';
	public date = new Date('October 8, 2024');
	public hidden = false;
	public excerpt = 'Castle Antibot Reverse Engineered';
	public keywords = ['reverse', 'javascript', 'python', 'castle-token'];

	public render() {
		return (
			<>
				<h1>Reverse Engineering Castle.io Antibot</h1>

				<></>

				<h2>Beginning Of The Story</h2>

				<p>
				Hi, I'm emre and this is my first blog. I was very interested in the blogs of many reverse engineers on the internet
				 on antibots and I decided to start my own blog. I chose castle as my first choice. I first encountered castle on coinbase, 
				 but I realized that even if we don't use it on login, we can still log in. So I started to search for other sites that use 
				 castle and someone on discord told me that rockstar is used in login and password reset. Since they also check castle here,
				  I chose rockstargames as I can test if the tool I am going to write works.
				</p>
				
				<h3>Lets reverse!</h3>
				
				<p>
				Upon reviewing the code, I noticed that the deobfuscation process was largely avoided and the function names were plainly visible.
				When I searched for 'castle' in the code, I came across a function named <code>createCastleRequestToken</code>.
				</p>
				
				<img src={image1.src} alt="createCastleRequestToken" />

				<p>
				After stepping through devtools several times (shortcut: F9, the function that takes me to the next step in JavaScript), 
				I think I've reached the main function. This function is called with a 'promise' and uses a generator structure, 
				so understanding the code isn't difficult at all.
				</p>
				<p>
				After a few more steps, I identified that the function generating the token is <code>l.createRequestToken()</code>.
				This function, in turn, was calling another function named <code>Yy().createRequestToken()</code>.
				</p>
				<img src={image2.src} alt="createRequestToken" />

				<p>
				When I saw that the function contains the 'then' function, I executed it directly, and boom,
				 I realized it also worked when I tried the castle token in the curl request. Now, all we need to do is dive deeper 
				 and generate this value in our local. :)
				</p>

				<p>
				I figured out how to dynamically generate the token because the returned data has <code>_value</code> in it, like an retard.
				</p>
				<img src={image3.src} alt="enc func" />

				<p>
				You can see that Nm(u) returns the <code>_r</code> data. Now, all we need to do is generate the <code>sr</code> and <code>_r</code> data!
				</p>

				<img src={image4.src} alt="_r and sr" />

				<p>
				It shouldn't have been this easy...
				</p>

				<img src={image5.src} />

				<ul>
				    <li><strong>n</strong> -> <code>window</code> object, we need it for getting the <code>t</code> value from local storage</li>
				    <li><strong>t</strong> -> 16-bit hash, <code>__cuid</code> in local storage :3</li>
				    <li><strong>_m</strong> -> "09", we can see <code>_m = ve(9)</code> line in JavaScript, it's static</li>
				    <li><strong>xa().ar.slice(3)</strong> -> <code>xa().ar</code> - pk_1Tt6Yzr1WFzxrJCh7WzMZzY1rHpaPudN (site-key) -> 1Tt6Yzr1WFzxrJCh7WzMZzY1rHpaPudN -> hash it with the <code>de()</code> function</li>
				</ul>

				<p>
				    Of course, understanding the parameters wasn’t difficult either; they were all clearly visible in the JavaScript. 
				    The reason we had to pass <code>window</code> became clear once we realized that <code>t</code> was stored in local storage.
				</p>
				
				<h2>Time to try running it locally!</h2>

				<p>
				Yes, I see no reason not to try running the `vm` function on our own local environment anymore. Let’s get started!

				</p>


				<Highlighter>
					{stripIndent`
						vm = function(t, e, r) {
                		var i = om()
                		  , o = um()
                		  , u = dm(n, Mu(), Nu(), Bu())
                		  , a = ve(ie(256))
                		  , c = se()
                		  , s = (c = va(la(c), da(c)),
                		hm(cm, i.length))
                		  , f = hm(sm, o.length);
                		return s = s + i.join("") + f + o.join("") + u.join("") + fm,
                		i = Gu(c, 4, c.charAt(3), s),
                		f = Gu(t, 8, t.charAt(9), c + i),
                		u = ve((o = e + r + am + t + f).length),
                		s = le(o + u, a),
                		c = ge(a + s),
                		zu(n, c) || ""
            		}

					`}
				</Highlighter>

				<p>
				    First, let's remove the <code>n</code> parameter, because it's not possible to use <code>window</code> in Node.js. Although it's achievable with frameworks like <code>jsdom</code>, we're not looking for that kind of solution here.
				</p>
				<img src={image6.src} />
				<p>
				    I wanted to skip the part up to the <code>return</code> line because I realized that those sections are used to gather the fingerprint and split it. However, when it comes to the fingerprint, it appears to be a list with a length of 42 consisting of <code>WebGL</code>, <code>userAgent</code>, and a few <code>event-id</code>s. (I haven't looked closely; I really think it's not necessary to fully reverse the fingerprint for such an easy anti-bot.) Personally, I plan to collect this from a real browser and use it in my solver.
				</p>
				
				<p>
				    Now we have some values to obtain! Here they are:
				</p>

				<ul>
				    <li><strong>c</strong> -> <code>va(la(timestamp), da(timestamp))</code> -> 12-digit hash</li>
				    <li><strong>a</strong> -> <code>ve(ie(256))</code> -> 2-digit random character generated with <code>Math.random</code></li>
				    <li><strong>s</strong> -> fingerprint (can be collected in large quantities from the browser and used randomly; I have tested it and it works)</li>
				    <li><strong>am</strong> -> "4903" which is a static value; we can obtain this data by reading the code or using a debugger</li>
				</ul>
				

				<img src={image7.src} />

				<img src={image8.src} />

				<p>
    Actually, to write a script that can run in JavaScript, what we need to do is roughly copy and paste all the required functions until the code runs, of course skipping the obfuscation.
</p>

<h2>Obfuscation Techniques Used</h2>

<p>
    Although it may not have received enough attention, I noticed that the code is at least made harder to read in some places. There were mainly two methods they used:
</p>

<ul>
    <li>The <code>Math</code> variable was defined as <code>t</code>.</li>
    <li>Using <code>a(index)</code> to change the strings within a tuple (I don't know the exact name of the technique, but it's a very common method).</li>
</ul>

<p>
    There's no need to write a deobfuscator for these two methods; you can simply type <code>a(155)</code> into the console and replace the values in the code with the output. That's the approach I chose.
</p>
<Note variant="warning" title="Warning">
If we had encountered a more complex JavaScript, this method would have been a real headache. In such a situation, I would recommend using an AST (Abstract Syntax Tree) parser.

				</Note>

				<h2>Final!</h2>
				
				<p>
				We have reversed everything except for the fingerprint generation! Now, let's test if our solver works using the fingerprints we've gathered!

				If you'd like, you can translate the code into your preferred programming language for higher performance. However, I will be using Python with `execjs`.
				</p>
					
				<img src={image9.src} />
				
				<p>
				__cuid generation using `urandom` was sufficient, and our solver is successfully working! Of course, improving its quality is possible by collecting more fingerprints on your own. If you'd like to code custom solvers, just want to talk about programming, or need consultation on any topic, my social media details are provided below. 

				I've also uploaded the solver to GitHub, which you can access from the link below. So far, it's only been tested on Rockstar Games, but I hope it will work on other sites as well. Happy coding, everyone! Thanks for reading.

				</p>
				
				<h2> Thanks</h2>
				<p>
				Special thanks to <code>Switch</code> for yapping with me in voice chat during the whole reverse process :)
				</p>

				<h3 align="left">Connect with me :3</h3>
				<p>
				  Discord: <a href="https://discord.com/users/510174958270545920">emrovsky</a>
				</p>


				<p>
				Discord server: <a href="https://discord.gg/switchuwu">.gg/switchuwu</a>
				</p>

				<p>
				Github repo: <a href="https://github.com/emrovsky/castle-io-reversed">https://github.com/emrovsky/castle-io-reversed</a>
				</p>


			</>
		);
	}
}