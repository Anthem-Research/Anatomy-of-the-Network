import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const chapters = [
  {
    kicker: 'Prelude',
    title: 'The state mistakes monopoly for necessity.',
    body: [
      `The state’s fatal weakness is that it mistakes its historical monopoly over coordination for proof that coordination requires the state.`,
      `For centuries this mistake was plausible. Memory required archives. Law required courts. Identity required documents. Capital required banks. Work required place. Security required territorial force. Under these conditions, the state fused land, people, records, taxation, legitimacy, and violence into one apparatus and called the result society.`,
      `That fusion is now breaking.`,
      `The internet created an external layer of human cognition: a structure through which persons could find one another, remember together, coordinate across distance, and accumulate common capacity without first passing through territorial enclosure. Blockchain, DAOs, network states, micronations, intentional communities, and related experiments are early and uneven attempts to give that layer persistence, rule, boundary, treasury, and embodiment. Most will fail. Their failure does not cancel their importance. They reveal that the state is no longer the only structure through which large-scale association can become real.`,
      `The crisis of the nation-state is therefore not only moral. It is structural. Its oldest justification was necessity. The network attacks necessity.`
    ]
  },
  {
    kicker: 'I',
    title: 'What the Network Is Not',
    body: [
      `The network is not the platform. It is not the feed, the interface, the application, or the stream of signals passing across a screen. These are instruments of transmission. They may assist the formation of a network, but they do not exhaust its meaning. A million persons may be technically connected without having formed any durable social body.`,
      `Nor is the network merely a public. A public is a field of attention. It is a population temporarily arranged around an event, controversy, personality, or common vocabulary. Publics fluctuate. They can be measured, targeted, manipulated, and dissolved. The network is more exacting. It begins where relation hardens into continuity, where continuity hardens into trust, and where trust begins to carry obligation, memory, and common function.`,
      `The network is also not a nation in waiting. It should not be reduced to one contemporary doctrine, one founder, one software stack, or one theory of digital succession. Network states belong here only as one ambitious species of a broader genus. They are attempts to convert networked association into territorial and political form. They do not define the network as such. The network is older and larger than any one program built upon it.`,
      `It is not identical with blockchain, though blockchain may serve it. It is not identical with a DAO, though a DAO may formalize part of its coordination. It is not identical with an intentional community, though an intentional community may become one of its embodied nodes. It is not identical with a micronation, though micronations often reveal the symbolic ambition and practical weakness of collective formation without recognition, force, or durable administration. None of these alone is the network. Each is only an instrument, episode, or expression.`,
      `Nor should the network be confused with freedom in any simple sense. The network does not abolish hierarchy, discipline, exclusion, or power. It does not dissolve the need for rules, thresholds, authority, or adjudication. It does not guarantee justice merely because membership is less inherited than in the state. Voluntary association can become opaque, coercive, sectarian, or oligarchic. The network is not innocent. It is distinct.`,
      `Most importantly, the network is not the state by another name. The state begins with enclosure. It defines a territory, binds a population to that territory, monopolizes law and force within it, and enters those born within its boundary into an administrative order whose continuity precedes consent. The network begins elsewhere. It begins with relation. It begins where persons join, remain, contribute, and accumulate common form prior to, across, or beyond inherited territorial assignment.`,
      `The distinction is not between order and disorder. It is between two methods of producing order. The state treats complexity as a problem to be reduced through enclosure, classification, and command. The network treats complexity as material from which order may emerge through relation, feedback, memory, and repeated coordination. The state simplifies from above. The network adapts from within.`
    ]
  },
  {
    kicker: 'II',
    title: 'What the Network Is',
    body: [
      `The network is a structure of chosen association through which persons coordinate life, preserve memory, allocate resources, build institutions, and accumulate common capacity across and prior to territory.`,
      `Its first principle is voluntary entry. This does not mean that networks are always open. They may be selective, disciplined, bounded, and demanding. It means that membership is not presumed by birth, census, or geographic exposure alone. A person is not born into the network in the same way that he is born into the jurisdiction of a state. He enters through participation, commitment, utility, belief, trust, or contribution.`,
      `Its second principle is relation before jurisdiction. A network becomes politically significant when persons begin to know one another not simply as co-subjects of a state, but as members of a shared form. This form may begin as discourse, production, exchange, study, belief, settlement, or risk-bearing. What matters is that the relation is direct. The members do not first encounter one another as units already enclosed within an imposed administrative order. They begin instead from a common orientation.`,
      `Its third principle is continuity. The network is not a passing crowd because it stores memory. It remembers commitments, contributions, procedures, precedents, obligations, reputations, and common assets. Without memory there is no durable association. There is only recurrent contact. The network becomes real only when it develops means of preservation across time.`,
      `Its fourth principle is feedback. A network does not remain coherent by declaration. It adjusts through repeated signals: contribution, reputation, trust, sanction, failure, repair, and exit. These feedback loops allow the network to learn. They also expose its weaknesses. A network without feedback becomes atmosphere. A network with feedback can become adaptive order.`,
      `Its fifth principle is function. A network that does nothing remains rhetorical. It may provide identity, sentiment, or symbolic alignment, but it does not yet rival the state in any serious sense. The network becomes consequential when it begins to coordinate education, production, finance, mutual aid, common standards, dispute handling, settlement, common property, shared tools, or institutional experimentation. Function shapes relation into form.`,
      `Its sixth principle is modularity. The network need not assume every political function at once. It can begin in one domain and extend into another. It may begin as a community of learning, a treasury, a settlement project, a protocol-governed body, a covenant community, or a distributed culture with physical nodes. It can remain partial and still be significant. The state derives strength from bundling. The network derives strength from gradual accretion.`,
      `Its seventh principle is layered belonging. The state prefers coincidence. It prefers that territory, law, identity, taxation, education, and public loyalty overlap within one enclosure. The network permits a different order. One may live in one territory, work in another market, store value through a third system, learn through a fourth community, and derive norms or recognition from a fifth. The network pluralizes belonging without abolishing it.`,
      `The network is therefore not an electronic novelty. It is an alternative architecture of collective life. It is a means by which persons associate and begin to carry functions that the state long claimed by default.`,
      `It is a complex adaptive system of association. It need not be complete at origin. It can begin small, respond to feedback, alter its own rules, shed failed forms, and accumulate new capacities. Its order is not given in advance. It emerges where boundary, memory, function, and participation reinforce one another.`
    ]
  },
  {
    kicker: 'III',
    title: 'What the State Is',
    body: [
      `The state is the contrary form.`,
      `It begins not with relation, but with capture. It defines a territory, binds a population to that territory, reserves final authority over law and force within it, and enters those born under it into a system of documents, classifications, permissions, taxes, and obligations from which departure is difficult, partial, or expensive. Its membership is not first chosen. It is assigned and then normalized.`,
      `Its strength lies in bundling. Territory, identity, law, record-keeping, taxation, legitimacy, and coercion are held in one apparatus. To live under the state is not merely to obey laws. It is to become legible through its documents, governable through its institutions, visible through its records, and dependent on its recognitions. The state is not only a ruler over land. It is an archive, a tax machine, a certification system, a border regime, and a monopoly over final force.`,
      `The state does not merely govern complexity. It reduces it. It converts persons into administrative units, places into jurisdictions, work into taxable categories, association into registered form, and movement into permission. Its strength lies in enforced legibility. What cannot be classified is made suspect. What cannot be recorded is made informal. What cannot be taxed, licensed, or adjudicated is treated as a threat to order.`,
      `The nation-state intensified this structure by fusing apparatus and peoplehood. It asked to be mistaken for country, memory, continuity, and common life. It treated the people as though they were politically formed by the mere fact of common subjection. What had in fact been an administrative enclosure was reimagined as a moral community. Persons were told that they already belonged because the state had already claimed them.`,
      `The durability of this arrangement depended on historical conditions. Work was more local. Records were centralized. Property and legal standing were more territorially fixed. Alternative forms of large-scale association were thinner, slower, and weaker. Under those conditions, the state could appear not merely powerful but inevitable. It occupied the decisive functions of organized life so densely that departure seemed deviant and alternatives unreal.`,
      `The state’s real superiority therefore did not lie in theory alone. It lay in retention. It held together the terms of existence tightly enough that persons could hardly imagine life politically outside it.`,
      `The state once solved coordination. Then it monopolized coordination. Then it confused monopoly with necessity. The network breaks that confusion.`
    ]
  },
  {
    kicker: 'IV',
    title: 'How the State Preserves Itself',
    body: [
      `The state preserves itself by ensuring that association remains secondary.`,
      `Its first mechanism is symbolic fusion. It appropriates the language of peoplehood, security, solidarity, citizenship, and public good. It presents itself as the highest and most complete expression of social order. The governed are invited to experience attachment to place, inheritance, language, memory, and common fate as attachment to the state itself.`,
      `Its second mechanism is administrative capture. The state occupies the points at which life becomes officially real. It records birth and death, certifies marriage, defines legal personhood, registers property, licenses work, validates firms, accredits institutions, and adjudicates enforceable disputes. These acts are not merely services. They are the means by which the state formats social existence and keeps association dependent on official translation.`,
      `Its third mechanism is infrastructural concentration. Borders, banks, courts, payroll systems, tax authorities, customs offices, land registries, schooling systems, and compliance regimes operate as chokepoints. The state need not intervene visibly at every moment if it controls the passages through which recognition must move. A person may condemn the state in theory while remaining practically enclosed within its operational mesh.`,
      `Its fourth mechanism is moral inversion. Dependence is represented as solidarity. Enclosure is represented as membership. Compulsory inclusion is represented as civic belonging. By contrast, alternative association is often depicted as parochial, unserious, sectarian, selfish, or anti-social unless it has already been certified by the state as legitimate and useful.`,
      `Its fifth mechanism is selective co-optation. The state does not always suppress association directly. It often absorbs it. It funds approved bodies, licenses experimental forms, deputizes voluntary organizations into policy delivery, and allows bounded alternatives where these increase governability. It tolerates or even encourages association precisely where association remains subordinate and dependent.`,
      `Its sixth mechanism is tactical adaptation. Where new tools emerge, the state adopts them if adoption preserves retention. It digitizes administration, licenses controlled mobility, builds interoperable identity systems, permits special zones, regulates new asset forms, and markets selective convenience to desirable populations. It does not surrender its claim to final authority. It refines the terms on which access and departure are managed.`,
      `Its seventh mechanism is lock-in. Institutions persist not because they are continuously chosen, but because earlier arrangements make departure costly. The passport, the registry, the tax number, the bank account, the school credential, the recognized address, and the licensed professional pathway form a system of accumulated dependence. The subject remains not because the state has won the argument, but because the cost of reorganizing life outside its categories remains high.`,
      `The state therefore survives not by destroying every form of association. It ensures that persons may gather, but not too far beyond its categories; may build, but only through approved channels; may associate, but rarely in ways that displace the state as the default carrier of common life.`
    ]
  },
  {
    kicker: 'V',
    title: 'How the Network Grows',
    body: [
      `The network grows where association recovers function.`,
      `Its development is not linear accumulation alone. It is threshold movement. Below a certain density of trust, memory, and contribution, there is only atmosphere. Once these elements reinforce one another, a different structure appears. A crowd becomes a network. A network becomes an association. An association may become an institution.`,
      `It begins, usually, with affinity. Persons discover common purposes, conditions, beliefs, opportunities, or dissatisfactions. At this stage the network is weak. Affinity alone produces atmosphere, not form. What matters next is trust: whether persons return, honor commitments, share risk, preserve memory, and become legible to one another as partners rather than spectators.`,
      `From trust the network moves to rule. Any durable network must eventually answer simple questions. Who belongs. Who decides. What is contributed. What is held in common. How disagreement is handled. Under what conditions one enters, exits, or is expelled. The language may remain informal, but the structure becomes unavoidable. The network ceases to be decorative when it begins to govern itself in bounded ways.`,
      `From rule it moves to function. A network must coordinate something substantial enough to bind members beyond sympathy. It may store capital, deploy shared tools, educate members, fund projects, settle disputes, allocate labor, preserve an archive, run a site, hold common assets, or maintain shared standards. Without function there is no real institutional density. There is only cultural style.`,
      `From function it may move to embodiment. Some networks remain largely distributed. Others seek sites, nodes, enclaves, settlements, campuses, private developments, cooperative communities, charter experiments, or more speculative forms of territorial expression. Network states, in their strongest formulation, belong here: they are attempts to turn digitally prior association into capital concentration, physical presence, and eventually recognized political form. Whether they succeed is a separate question. Their importance lies in the sequence they imply: persons associate first and seek territory later, rather than being assigned territory first and called a people afterward.`,
      `Blockchain, DAOs, protocol systems, and shared ledgers matter here as instruments. Blockchain can preserve memory and enable shared custody or transfer without a centralized trustee. DAOs can formalize procedures for treasury and participation among known or semi-known members. These systems matter because they alter feedback and memory. A ledger is not a society, but it can preserve commitments. A DAO is not a polity, but it can encode procedures. A protocol is not a culture, but it can stabilize repeated coordination. Their value lies not in replacing human judgment, but in changing the conditions under which distributed association can persist.`,
      `Micronations and intentional communities reveal the same logic at different levels. Micronations often fail at the threshold of recognition, force, or durable administration, but they expose the symbolic fragility of sovereignty. Intentional communities, by contrast, bring the issue down to scale. They test whether explicit membership, shared norms, common assets, boundary rules, and exit procedures can sustain a real common life in place. Many fail. Their failures are instructive. They show that association becomes serious only when it confronts maintenance, scarcity, authority, and entropy.`,
      `The network grows, then, not by noise but by accumulated institutional thickness. It becomes politically relevant when persons discover that they can carry more and more of life together without beginning from compulsory enclosure.`
    ]
  },
  {
    kicker: 'VI',
    title: 'What the State Fears',
    body: [
      `The state does not fear criticism most. It fears association that becomes operational.`,
      `Criticism can be processed. Elections can absorb it. Public rhetoric can reframe it. Bureaucracies can survive it. Even unrest can often be contained if the governed remain dependent on the same apparatus for legal identity, movement, education, payment rails, dispute resolution, and official standing.`,
      `The real danger begins when a network ceases to be symbolic.`,
      `A discussion forum is tolerable. A subculture is tolerable. A digital audience is tolerable. Even a dissenting public is often tolerable. What is less tolerable is an association that can retain memory, hold assets, enforce norms, educate members, maintain continuity, coordinate work, settle internal expectations, and begin to embody itself in durable nodes.`,
      `The state fears not only the dissenter, but the group that can persist beyond dissent. It fears the school that does not require its prestige, the treasury it cannot easily freeze, the settlement whose members derive legitimacy from one another, the protocol-governed body that stores value and procedure outside its immediate control, the intentional community that does not treat state institutions as the only carriers of order, and the growing network that makes comparison possible.`,
      `Above all, it fears the discovery that common life can be built rather than merely inherited through subjection. So long as the state appears to be the sole serious container of organized life, dissatisfaction remains manageable. Once other containers become credible, the state must confront something more dangerous than hostility: contingency.`,
      `The state fears phase transition. It can endure isolated alternatives because they remain peripheral. It is less comfortable when alternatives begin to connect, copy one another, share tools, exchange members, coordinate standards, and become a field. At that point the problem is no longer one dissident group. It is a rival attractor.`,
      `A state can survive being hated. It is less comfortable being bypassed.`
    ]
  },
  {
    kicker: 'VII',
    title: 'What the Network Cannot Yet Solve',
    body: [
      `The network should not be romanticized.`,
      `Its strengths are uneven. It is often strong where communication, coordination, finance, record preservation, and shared culture dominate. It is weaker where land, water, energy, infrastructure, family continuity, security, coercive risk, and intergenerational maintenance become unavoidable. It can assemble discourse faster than it can assemble sewage. It can preserve a treasury faster than it can preserve a town.`,
      `This is why so many contemporary alternatives remain partial. Blockchain does not repair roads. A DAO does not keep a roof standing. A network state thesis does not in itself solve policing, adjudication, land use, or public works. Micronational declarations do not generate recognition. Intentional communities often collapse under the ordinary burdens of conflict, hierarchy, drift, maintenance, and resource scarcity.`,
      `The difficulty is structural. Physical life accumulates entropy. Any network that seeks durable embodiment must eventually answer questions of boundary, rule, role, contribution, authority, sanction, maintenance, renewal, and exit. It must become more formal than its early rhetoric often admits. In this respect, the most serious post-state work begins where abstraction ends.`,
      `Emergence is not magic. It depends on boundary conditions. A network with no boundary remains a crowd. A network with no memory cannot learn. A network with no sanction cannot defend its norms. A network with no exit becomes another enclosure. A network with no maintenance decays. The question is not whether order can emerge from below. It can. The question is what constraints allow emergence to remain coherent rather than collapse into drift.`,
      `There is also the risk of re-enclosure. Voluntary association does not guarantee just association. Networks can become exclusionary, exploitative, cultic, opaque, or oligarchic. Protocols can naturalize new elites under the language of neutrality. Private jurisdictions can become service layers for the mobile affluent. The network is not immune from domination merely because its sequence differs from that of the state.`,
      `These are not arguments against the network. They are conditions under which the network becomes serious enough to stand in real tension with the state.`
    ]
  },
  {
    kicker: 'VIII',
    title: 'How States Relate to Networks and to One Another',
    body: [
      `The older image of politics imagined states confronting only other states. That image is now incomplete.`,
      `States continue to confront one another militarily, diplomatically, and economically. But they also operate in an environment increasingly shaped by translocal associations, distributed capital, protocol systems, digital communities, shared standards, and other non-state forms of coordination that do not fit neatly inside territorial lines. These forms are not fully external to the state, yet neither are they reducible to it.`,
      `The result is a more complex field. States compete for mobile capital, skilled labor, productive firms, and institutional density. They market access, convenience, selective openness, and differentiated regulatory environments to attractive populations. At the same time, they coordinate to preserve legibility across borders through reporting, compliance, information sharing, sanctions, and supervisory regimes. They open selectively and close selectively. They compete within a broader architecture of mutual state interest.`,
      `The network alters this field because it is neither merely domestic society nor foreign sovereignty. It is an intermediate and rival form. It may exist across jurisdictions, thicken within them, and occasionally seek territorial embodiment of its own. It can be courted, regulated, co-opted, dispersed, or feared. It introduces into politics something the state has long tried to contain: collective life that begins elsewhere.`,
      `The state system is adapting to networks in the same way any entrenched system adapts to a rival source of complexity. It attempts to classify what was informal, regulate what was fluid, absorb what was useful, and isolate what cannot be absorbed. It turns novelty into category. It turns category into compliance. It turns compliance into retention.`,
      `But the process does not move in one direction only. Networks also learn from states. They discover the need for records, rules, boundaries, treasuries, dispute procedures, membership thresholds, and embodied infrastructure. The conflict is therefore not between organization and non-organization. It is between two attractors of organization: compulsory enclosure and voluntary association.`
    ]
  },
  {
    kicker: 'IX',
    title: 'History as a Struggle Between Enclosure and Association',
    body: [
      `Modern political history is often narrated as a struggle over who should govern the state. A deeper reading would treat it as a struggle between enclosure and association.`,
      `Enclosure binds law, identity, labor, taxation, record, memory, and allegiance inside one compulsory territorial shell. It prefers inherited membership, centralized recognition, and difficult departure. Its ideal subject is the administratively legible person whose social, legal, and economic existence remains dense with dependence on one apparatus.`,
      `Association begins from another principle. It begins from relation, consent, contribution, and chosen continuity. It assumes that collective form can be built from within the commitments of persons rather than imposed upon them in advance. It does not abolish order. It contests the state’s monopoly over the origins of order.`,
      `The nation-state rose under conditions favorable to enclosure. Movement was harder. Records were concentrated. Productive life was more local. Alternatives to territorial coordination were thinner and slower. Under those conditions, the state could present itself not merely as strong but as natural.`,
      `Those conditions are weakening.`,
      `The state remains formidable. It still commands force, borders, law, taxation, documents, and bureaucracies. It still governs the material conditions under which most human beings live. But it now operates in a world where persons can gather, remember, fund, build, and in limited domains govern across boundaries that once defined the whole horizon of political possibility.`,
      `This is the significance of the network. It is not merely an exit from the state. It is the reappearance of association as a rival principle of collective life. It shows that common form need not always begin from capture. It may begin from relation, thicken through function, and only afterward seek embodiment.`,
      `The conflict is therefore not only political. It is systemic. The state is a historically dominant attractor: a form toward which identity, territory, law, taxation, and force were pulled under earlier conditions of low mobility and concentrated records. The network is a competing attractor: a form toward which association, capital, work, memory, and governance begin to move when coordination can occur across distance. The state is integrated, legible, and coercive. The network is modular, adaptive, and unstable. Neither is innocent. But they organize complexity differently.`,
      `The network does not defeat the state by declaring independence. It defeats the state function by function. It takes memory from the archive, exchange from the bank, affiliation from citizenship, coordination from bureaucracy, legitimacy from territory, and governance from monopoly. The state remains powerful where bodies, land, and force remain enclosed. But its metaphysical claim is broken. It is no longer the only architecture of order.`,
      `The state is a system of imposed simplification. The network is a system of bounded emergence. The state encloses first and legitimates later. The network associates first and seeks form later.`,
      `That is the anatomy of the network.`
    ]
  }
];

const defaults = {
  attraction: 0.48,
  memory: 0.56,
  boundary: 0.42,
  centralization: 0.18,
  drift: 0.28,
  entropy: 0.24
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function makePoints(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.002,
    vy: (Math.random() - 0.5) * 0.002,
    home: Math.random() > 0.52 ? 1 : 0,
    phase: Math.random() * Math.PI * 2
  }));
}

function Field({ settings, section }) {
  const canvasRef = useRef(null);
  const pointsRef = useRef(makePoints(92));
  const memoryRef = useRef([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let raf;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function draw() {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      frameRef.current += 1;

      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#f3efe5';
      ctx.fillRect(0, 0, w, h);

      const pts = pointsRef.current;
      const center = { x: 0.52, y: 0.48 };
      const attractors = [
        { x: 0.36, y: 0.38 },
        { x: 0.64, y: 0.58 },
        { x: 0.49, y: 0.72 }
      ];

      for (const p of pts) {
        const target = attractors[p.id % attractors.length];
        const toLocalX = target.x - p.x;
        const toLocalY = target.y - p.y;
        const toCenterX = center.x - p.x;
        const toCenterY = center.y - p.y;

        p.vx += toLocalX * settings.attraction * 0.00035;
        p.vy += toLocalY * settings.attraction * 0.00035;
        p.vx += toCenterX * settings.centralization * 0.00085;
        p.vy += toCenterY * settings.centralization * 0.00085;
        p.vx += Math.sin(frameRef.current * 0.008 + p.phase) * settings.drift * 0.00018;
        p.vy += Math.cos(frameRef.current * 0.007 + p.phase) * settings.drift * 0.00018;
        p.vx *= 0.986 - settings.entropy * 0.012;
        p.vy *= 0.986 - settings.entropy * 0.012;
        p.x = clamp(p.x + p.vx, 0.06, 0.94);
        p.y = clamp(p.y + p.vy, 0.08, 0.92);
      }

      const linkThreshold = 0.115 + settings.boundary * 0.05;
      const newLinks = [];
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkThreshold && (a.id + b.id + frameRef.current) % 4 === 0) {
            newLinks.push({ ax: a.x, ay: a.y, bx: b.x, by: b.y, life: settings.memory });
          }
        }
      }
      memoryRef.current.push(...newLinks.slice(0, 16));
      memoryRef.current = memoryRef.current
        .map((m) => ({ ...m, life: m.life - (0.0025 + settings.entropy * 0.004) }))
        .filter((m) => m.life > 0)
        .slice(-720);

      ctx.lineWidth = 0.75;
      for (const m of memoryRef.current) {
        ctx.strokeStyle = `rgba(24, 23, 20, ${clamp(m.life * 0.34, 0, 0.24)})`;
        ctx.beginPath();
        ctx.moveTo(m.ax * w, m.ay * h);
        ctx.lineTo(m.bx * w, m.by * h);
        ctx.stroke();
      }

      if (settings.boundary > 0.24) {
        ctx.strokeStyle = `rgba(24, 23, 20, ${0.08 + settings.boundary * 0.18})`;
        ctx.lineWidth = 1.1;
        for (const a of attractors) {
          ctx.beginPath();
          const radius = 52 + settings.boundary * 56 - settings.entropy * 22;
          ctx.ellipse(a.x * w, a.y * h, radius, radius * 0.72, Math.sin(frameRef.current * 0.003 + a.x) * 0.45, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      if (settings.centralization > 0.18) {
        const r = 95 + settings.centralization * 145;
        ctx.strokeStyle = `rgba(130, 36, 28, ${0.08 + settings.centralization * 0.24})`;
        ctx.lineWidth = 1.2 + settings.centralization * 1.3;
        ctx.beginPath();
        ctx.ellipse(center.x * w, center.y * h, r, r * 0.8, 0.15, 0, Math.PI * 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(center.x * w, center.y * h, 3.4 + settings.centralization * 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(130, 36, 28, ${0.18 + settings.centralization * 0.28})`;
        ctx.fill();
      }

      for (const p of pts) {
        const size = 1.5 + settings.memory * 1.5;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(24, 23, 20, 0.72)';
        ctx.fill();
      }

      ctx.font = '11px ui-monospace, SFMono-Regular, Menlo, monospace';
      ctx.fillStyle = 'rgba(24, 23, 20, 0.46)';
      const label = settings.centralization > 0.55 ? 'enclosure' : settings.boundary > 0.55 && settings.memory > 0.5 ? 'bounded emergence' : 'drift';
      ctx.fillText(label, 22, h - 24);
      ctx.fillText(`chapter ${String(section + 1).padStart(2, '0')}`, w - 104, h - 24);

      raf = window.requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [settings, section]);

  return <canvas className="field-canvas" ref={canvasRef} aria-label="Interactive abstract field simulation" />;
}

function Slider({ label, value, onChange }) {
  return (
    <label className="control">
      <span>{label}</span>
      <input type="range" min="0" max="1" step="0.01" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}

function App() {
  const [settings, setSettings] = useState(defaults);
  const [section, setSection] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const progress = doc.scrollTop / Math.max(1, doc.scrollHeight - doc.clientHeight);
      setSection(clamp(Math.floor(progress * chapters.length), 0, chapters.length - 1));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const mode = useMemo(() => {
    if (settings.centralization > 0.62 && settings.boundary > 0.45) return 'enclosure';
    if (settings.memory > 0.52 && settings.boundary > 0.42 && settings.attraction > 0.36) return 'bounded emergence';
    return 'drift';
  }, [settings]);

  const update = (key) => (value) => setSettings((s) => ({ ...s, [key]: value }));

  return (
    <main>
      <section className="hero">
        <p className="eyebrow">Anthem Research</p>
        <h1>Anatomy of the Network</h1>
        <p className="thesis">The state is imposed simplification. The network is bounded emergence.</p>
        <a href="#instrument" className="enter">enter the field</a>
      </section>

      <section id="instrument" className="instrument">
        <div className="visual-panel">
          <Field settings={settings} section={section} />
        </div>
        <aside className="control-panel">
          <div className="mode">{mode}</div>
          <Slider label="attraction" value={settings.attraction} onChange={update('attraction')} />
          <Slider label="memory" value={settings.memory} onChange={update('memory')} />
          <Slider label="boundary" value={settings.boundary} onChange={update('boundary')} />
          <Slider label="centralization" value={settings.centralization} onChange={update('centralization')} />
          <Slider label="drift" value={settings.drift} onChange={update('drift')} />
          <Slider label="entropy" value={settings.entropy} onChange={update('entropy')} />
          <button type="button" onClick={() => setSettings(defaults)}>reset</button>
        </aside>
      </section>

      <section className="chapters">
        {chapters.map((chapter) => (
          <article className="chapter" key={chapter.title}>
            <p className="kicker">{chapter.kicker}</p>
            <h2>{chapter.title}</h2>
            <div className="chapter-body">
              {chapter.body.map((paragraph, index) => (
                <p key={`${chapter.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </article>
        ))}
      </section>

      <footer>
        <p>The state encloses first and legitimates later. The network associates first and seeks form later.</p>
      </footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
