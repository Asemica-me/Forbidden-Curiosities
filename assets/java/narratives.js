/*modal */

function openModalBtn(btn) {
	document.getElementById("sumModal").classList.add('visible') ;
	document.getElementById("content").classList.add('opaque');
	document.body.style.overflow = 'hidden';
   
        var buttonText = btn.innerText;
        var title = document.getElementById('sumTitle');
        title.innerText = buttonText;

		if (btn.innerText == "ETHICS OF WAR"){
			var summary = NarSum["ethics"];
		}
		if (btn.innerText == "SCIENTIFIC REVOLUTION"){
			var summary = NarSum["scientific"];
		}
		if (btn.innerText == "WOMEN'S HISTORY"){
			var summary = NarSum["women"];
		}
		if (btn.innerText == "RELIGIOUS DISSENT"){
			var summary = NarSum["religious"];
		}
		if (btn.innerText == "PROVOCATIVE ART"){
			var summary = NarSum["provocative"];
		}
		if (btn.innerText == "DIGITAL PRIVACY"){
			var summary = NarSum["digital"];
		}
		if (btn.innerText == "TEXTS"){
			var summary = NarSum["texts"];
		}
		if (btn.innerText == "TOOLS"){
			var summary = NarSum["tools"];
		}
		if (btn.innerText == "WEAPONS"){
			var summary = NarSum["weapons"];
		}
		if (btn.innerText == "GARMENTS"){
			var summary = NarSum["garments"];
		}
		if (btn.innerText == "EVENTS"){
			var summary = NarSum["events"];
		}
		if (btn.innerText == "WORKS OF ART"){
			var summary = NarSum["works"];
		}
		if (btn.innerText == "XV-XVII"){
			var summary = NarSum["XV"];
		}
		if (btn.innerText == "XVII-XIX"){
			var summary = NarSum["XVII"];
		}
		if (btn.innerText == "FIRST HALF XX"){
			var summary = NarSum["FIRST"];
		}
		if (btn.innerText == "SECOND HALF XX"){
			var summary = NarSum["SECOND"];
		}
		if (btn.innerText == "XXI"){
			var summary = NarSum["XXI"];
		}
		var sumCont = document.getElementById('sumCont');
        sumCont.innerText = summary;
		
    }


function closeModalBtn(){
	document.getElementById("sumModal").classList.remove('visible') ;
	document.getElementById("content").classList.remove('opaque');
	document.body.style.overflow = ''; 
}

let NarSum = {
	scientific:"The selected artifacts highlight the transformative impact of the Scientific Revolution, shedding light on pivotal discoveries, inventions, and ideas that redefined humanity's understanding of the natural world. These objects capture the spirit of inquiry and innovation that characterized this era, reflecting the groundbreaking achievements and the challenges faced by scientists as they questioned traditional beliefs and developed new frameworks of knowledge. By exploring these artifacts, we gain insight into the profound influence of the Scientific Revolution on modern science, technology, and society, as well as the enduring legacy of this period in shaping the way we perceive and engage with the world.",
	ethics: "The selected artifacts on the ethics of war highlight the moral dilemmas and philosophical debates surrounding armed conflict. They explore key concepts like just war theory, pacifism, and humanitarian principles aimed at reducing suffering. These works reveal how individuals and societies grapple with issues of legitimacy, proportionality, and the rights of combatants and civilians. By examining them, we gain insight into the ethical frameworks that shape decisions on warfare, peacebuilding, and justice, underscoring the enduring quest for ethical conduct in times of conflict." ,
	women: "The selected artifacts illustrate the diverse and impactful roles women have played throughout history, shedding light on key moments and objects that reflect the evolving status and contributions of women in society. Women’s History encompasses a broad spectrum of experiences and achievements, revealing the struggles, triumphs, and transformations that have defined the female experience across different eras.",
	religious: "The selected artifacts showcase the significant role of religious dissent throughout history, reflecting key moments of challenge and transformation. They reveal the struggles and convictions of individuals and groups who questioned authority, redefined faith, and advocated for freedom of belief, shaping spiritual and social landscapes across eras.",
	provocative: "Welcome to the realm of Provocative Art, where creative expression pushes the limits of conventional norms and stirs heated debate. This narrative explores how artists use their works to question, confront, and sometimes even outrage societal standards and expectations, with the deliberate intention to provoke a reaction. These artists challenged traditional aesthetics, moral values, and cultural taboos, prompting viewers to reconsider their perspectives and engage in meaningful discussions. ",
	digital: "The AI-generated image of Pope Francis in a puffer jacket highlights the dangers of digital manipulation in the modern era. These deepfakes undermine trust in the authenticity of images, raising serious concerns about privacy and the integrity of identities. The ease with which false images can be created and spread calls for reflection on how to protect people's reputations and identities in today's digital context. The Enigma encryption system, used by the Germans during World War II, represents a turning point in the history of cryptography and information security. Its decryption by the Allies underscored the importance of protecting sensitive communications, a crucial aspect in the protection of privacy in the digital realm today, where information security is paramount. Edward Snowden's revelations brought to light the NSA's mass surveillance practices, sparking a global debate about the tension between national security and individual privacy. These revelations highlighted the need for transparency and democratic oversight of surveillance programs, raising critical questions about how to balance security with the right to privacy in an increasingly interconnected world. In summary, these examples show the complexity and multidimensionality of the concept of privacy. Digital manipulation, communication security, and mass surveillance are interconnected issues that require a careful and balanced approach. Privacy is not just a technical issue, but an essential element of democracy and individual freedom, which must be protected against modern threats.",
	texts: "The selected texts illuminate the diverse and influential roles that written works have played throughout history, offering a window into key moments and ideas that reflect the evolving intellectual, cultural, and social landscapes of different eras. Texts, whether literary, philosophical, or political, encompass a wide array of voices and perspectives, revealing the struggles, triumphs, and transformations that have shaped human thought and society. These writings bear witness to the power of words to inspire change, challenge norms, and document the complexities of the human experience across time.",
	tools: "The selected tools illustrate the diverse and essential roles that human ingenuity and innovation have played throughout history, offering insight into key moments and objects that reflect the evolving ways in which people have shaped and interacted with their environments. Tools, whether simple or complex, span a wide range of functions and applications, revealing the progress, challenges, and transformations that have defined human creativity and survival. These artifacts demonstrate the power of invention in addressing needs, solving problems, and advancing societies across different periods.",
	weapons: "The selected weapons reveal the diverse and pivotal roles that armed conflict and defense have played throughout history, providing insight into key moments and objects that reflect the evolving strategies, technologies, and power dynamics of warfare. Weapons, from rudimentary tools of survival to advanced instruments of battle, span a broad range of forms and functions, illustrating the struggles, conquests, and transformations that have shaped civilizations. These artifacts bear witness to the human capacity for both destruction and protection, highlighting the complex relationship between warfare, society, and technological advancement across different eras.",
	garments: "The selected garments showcase the diverse and meaningful roles that clothing has played throughout history, offering insight into key moments and pieces that reflect the evolving cultural, social, and economic landscapes of various societies. Garments, from everyday attire to ceremonial or symbolic wear, span a wide range of styles and functions, revealing the traditions, status markers, and transformations that have defined personal and collective identities. These artifacts highlight the ways in which clothing has communicated power, gender, and cultural values, illustrating the changing dynamics of fashion, craftsmanship, and expression across different periods.",
	events: "The selected events illustrate the diverse and profound impact of pivotal moments throughout history, shedding light on key occurrences that have shaped the political, cultural, and social landscapes of various societies. These events, whether driven by conflict, innovation, or social movements, span a wide range of scales and significances, revealing the struggles, triumphs, and transformations that have defined the course of human history. Each event serves as a reflection of its time, highlighting the evolving values, power dynamics, and collective aspirations that have influenced societies across different eras.",
	works: "The selected works exemplify the diverse and significant contributions that creative expression has made throughout history, offering insights into key pieces that reflect the evolving cultural, artistic, and intellectual currents of various societies. These works, whether in literature, visual arts, music, or other forms, span a broad spectrum of styles and genres, revealing the struggles, inspirations, and transformations that have shaped human creativity. Each piece serves as a testament to the power of artistic expression to challenge norms, provoke thought, and inspire change, highlighting the dynamic interplay between culture and society across different eras.",
	XV: "The selected artifacts from the 15th to 17th centuries illustrate the profound and multifaceted transformations that occurred during this dynamic period in history, reflecting key moments and objects that shaped the political, cultural, and social landscapes of Europe and beyond. Spanning the Renaissance, the Reformation, and the Age of Exploration, this era was marked by an explosion of artistic innovation, scientific discovery, and religious upheaval. Artifacts from these centuries reveal the struggles and triumphs of individuals and communities as they navigated shifting power dynamics, challenged established norms, and expanded their horizons through exploration and colonization. These pieces serve as vital reminders of the rich tapestry of human experience, highlighting the interconnections between creativity, belief, and the quest for knowledge that defined the 15th to 17th centuries.",
	XVII: "The selected artifacts from the 17th to 19th centuries illuminate the transformative changes that defined this critical period in history, reflecting key moments and objects that shaped the political, cultural, and social landscapes across the globe. This era witnessed the rise of Enlightenment thought, the expansion of empires, and significant social upheavals, including revolutions and movements for rights and freedoms. Artifacts from these centuries reveal the complexities of industrialization, the evolution of artistic expression, and the shifting dynamics of power and class. They highlight the struggles and aspirations of individuals and groups as they sought to redefine society, challenge oppressive structures, and embrace new ideas. These pieces serve as essential reminders of the rich interplay between innovation, ideology, and social change that characterized the 17th to 19th centuries.",
	FIRST: "The selected artifacts from the first half of the 20th century reflect the dramatic and transformative changes that characterized this tumultuous period in history, showcasing key moments and objects that shaped global political, cultural, and social landscapes. This era witnessed two world wars, the rise and fall of empires, and significant movements for social justice and civil rights. Artifacts from this time reveal the complexities of technological advancement, artistic innovation, and ideological struggle, as societies grappled with the consequences of conflict and the quest for progress. They highlight the voices of individuals and groups who challenged norms and advocated for change, illustrating the profound impact of modernity on everyday life. These pieces serve as important reminders of the resilience and creativity of humanity in the face of upheaval, as well as the ongoing pursuit of identity and meaning in an increasingly interconnected world.",
	SECOND: "The selected artifacts from the second half of the 20th century illustrate the profound and varied changes that shaped this dynamic period in history, reflecting key moments and objects that influenced global political, cultural, and social landscapes. This era was marked by the aftermath of World War II, the Cold War, the civil rights movement, and significant shifts in technology and culture. Artifacts from this time reveal the complexities of decolonization, the rise of counterculture, and the ongoing struggles for equality and justice. They highlight the voices of individuals and movements that challenged established norms, embraced new ideologies, and sought to redefine identities in an increasingly interconnected world. These pieces serve as crucial reminders of the resilience of the human spirit and the transformative power of creativity, activism, and innovation during a time of rapid change and global interdependence.",
	XXI: "The selected artifacts from the 21st century illuminate the rapid and multifaceted changes that define this current era, reflecting key moments and objects that shape contemporary political, cultural, and social landscapes. This period has been characterized by significant technological advancements, globalization, and urgent discussions around issues such as climate change, social justice, and human rights. Artifacts from this time reveal the complexities of a digital age, where information flows freely and communities are both connected and divided. They highlight the voices of diverse individuals and movements that challenge traditional power structures, advocate for inclusivity, and strive for sustainable futures. These pieces serve as vital reminders of the dynamic interplay between innovation, activism, and cultural expression, illustrating the ongoing quest for identity, belonging, and meaningful change in an increasingly interconnected world.",

  };


  window.addEventListener("load", () => {
    const btnContainers = document.querySelectorAll(".btnCont");
    
    btnContainers.forEach((container, index) => {
        // Add the animation class with a delay
        setTimeout(() => {
            container.classList.add("animate");
        }, index * 200); // Delay each container by 200ms
    });
});