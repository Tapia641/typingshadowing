import type { Level, TypingText } from "./types";

/**
 * Textos de práctica por nivel. Los fragmentos provienen de obras de dominio
 * público o son textos originales escritos para esta aplicación, adaptados a
 * la complejidad de cada nivel MCER. No se reproduce material con copyright.
 */
export const TEXTS: TypingText[] = [
  // ---------------------------------------------------------------- A1
  {
    id: "a1-cat",
    level: "A1",
    title: "The Cat and the Milk",
    source: "Texto original para principiantes",
    body: "The cat is at home. It is a small black cat. It likes milk. It is hungry now. It can see a bowl. The bowl is on the table. The cat jumps up. It drinks the milk. Then it is happy. The cat sleeps in the sun.",
  },
  {
    id: "a1-day",
    level: "A1",
    title: "My Day",
    source: "Texto original para principiantes",
    body: "I am Anna. I get up at seven. I eat bread and eggs. I drink coffee with milk. I go to work by bus. I like my job. In the evening, I cook dinner. I talk with my family. I read a book. I go to bed at ten.",
  },
  {
    id: "a1-room",
    level: "A1",
    title: "My New Room",
    source: "Texto original para principiantes",
    body: "This is my room. The walls are white. There is a big bed. There is a small desk. A lamp is on the desk. I have three books and one pen. My shoes are under the bed. The window is open. The air is fresh. I feel good here.",
  },

  // ---------------------------------------------------------------- A2
  {
    id: "a2-weekend",
    level: "A2",
    title: "A Weekend in the Country",
    source: "Texto original adaptado a nivel elemental",
    body: "Last weekend my friends and I went to the country. We left the city early on Saturday morning and took a train to a small village. The weather was warm and the sky was clear. We walked along a river and stopped to take photos. At noon we ate sandwiches near an old bridge. In the afternoon we visited a farm and helped to feed the animals. It was a simple day, but we had a lot of fun.",
  },
  {
    id: "a2-coffee",
    level: "A2",
    title: "The Coffee Shop",
    source: "Texto original adaptado a nivel elemental",
    body: "There is a small coffee shop near my house. The owner is a friendly woman named Rosa. Every morning I buy a cup of coffee there and read the news. She always remembers my name and asks how I am. The shop is warm in winter and cool in summer. Students come there to study, and neighbours meet to talk. It is not a big place, but it feels like home.",
  },

  // ---------------------------------------------------------------- B1
  {
    id: "b1-robinson",
    level: "B1",
    title: "A Sailor's Decision",
    source: "Adaptación libre de Robinson Crusoe (Daniel Defoe, dominio público)",
    body: "For many years I had dreamed of going to sea, although my father had warned me against it. He believed that a quiet life at home was the safest path, and he described how dangerous the ocean could be. I listened to him politely, but my desire was stronger than his advice. When a friend offered me a place on a ship, I accepted without hesitation. At that moment I did not imagine the storms, the loneliness, or the long years of struggle that were waiting for me.",
  },
  {
    id: "b1-science",
    level: "B1",
    title: "Why We Sleep",
    source: "Texto original de divulgación a nivel intermedio",
    body: "Scientists have studied sleep for many decades, yet it still surprises them. During the night the brain does not simply rest. It organises memories, repairs cells, and prepares the body for a new day. People who sleep well usually learn faster and feel calmer, while those who sleep badly often struggle to concentrate. However, many of us treat sleep as something optional, something we can borrow from and repay later. The research suggests we cannot. Sleep is not a pause in life; it is part of it.",
  },
  {
    id: "b1-city",
    level: "B1",
    title: "Living Without a Car",
    source: "Texto original de divulgación a nivel intermedio",
    body: "When I moved to the city, I decided to sell my car. At first the change felt strange, and I worried about being late for work. In practice, however, my life became simpler. I walk more, I use the underground, and I rent a bicycle when the weather is good. I spend less money on fuel and repairs, and I feel healthier. The biggest surprise, though, is how much of the city I had never noticed. Traveling more slowly has taught me to look around.",
  },

  // ---------------------------------------------------------------- B2
  {
    id: "b2-frankenstein",
    level: "B2",
    title: "The Creature's Plea",
    source: "Adaptación libre de Frankenstein (Mary Shelley, dominio público)",
    body: "You accuse me of crimes, and yet you refuse to hear my story. I was not always the miserable creature you see before you. Once I felt hope; once I believed that kindness might reach me, even in my strange and frightening form. I learned language by listening at a window, and I learned to admire the very people who would later drive me away. If you, who gave me life, cannot offer me a single gentle word, then how can you be surprised that the world has taught me to hate?",
  },
  {
    id: "b2-technology",
    level: "B2",
    title: "The Attention Economy",
    source: "Texto original de opinión a nivel intermedio alto",
    body: "The modern internet was built on a simple bargain: the service is free, and in exchange we offer our attention. Over time, however, that bargain has been quietly rewritten. Platforms are designed to keep us in place for as long as possible, and the tools that measure our habits are far more sophisticated than the ones that protect us from them. It is easy to blame individual willpower, yet the problem is structural. When a product's revenue depends on how long we stay, the incentives push toward distraction, not clarity. Reclaiming our focus is not simply a personal project; it is a response to a system designed to consume it.",
  },

  // ---------------------------------------------------------------- C1
  {
    id: "c1-pride",
    level: "C1",
    title: "An Unexpected Proposal",
    source: "Adaptación libre de Orgullo y Prejuicio (Jane Austen, dominio público)",
    body: "It is a truth sufficiently acknowledged that a person in possession of a comfortable fortune must be in want of a suitable match, however little may be known of the feelings of the person concerned. Such considerations, when examined closely, reveal more about the expectations of society than about the desires of any individual. Elizabeth had long observed that the world was eager to arrange the lives of others while claiming to act in their interest. She therefore listened to the proposal with composure, weighing each elegant phrase, and found that it concealed very little that resembled genuine affection.",
  },
  {
    id: "c1-mind",
    level: "C1",
    title: "The Architecture of Memory",
    source: "Texto original de ensayo a nivel avanzado",
    body: "Memory is not a warehouse where the past is stored intact, waiting to be retrieved in its original form. It is closer to a workshop, where each recollection is rebuilt from fragments every time we summon it. This process is remarkably efficient and equally fallible. The same mechanism that lets us recognise a familiar face after decades also allows a confident witness to describe an event that never occurred. What we call remembering is, in truth, an act of reconstruction, guided by expectation, emotion, and the stories we have told ourselves so often that they have hardened into fact.",
  },

  // ---------------------------------------------------------------- C2
  {
    id: "c2-moby",
    level: "C2",
    title: "The Whiteness of the Whale",
    source: "Adaptación libre de Moby-Dick (Herman Melville, dominio público)",
    body: "It was the whiteness of the whale that above all things appalled me. But how can I hope to explain myself here, and yet, in some dim, random way, explain myself I must, else all these chapters might be naught. For though in many natural objects whiteness refiningly enhances beauty, as if imparting some special virtue of its own, yet there was a subtler mystery in this hue, a pallor that seemed to summon terror rather than delight. Amid the infinite series of the manifold meanings of colour, this one remained, to the end, unaccountable, an elusive spectre that haunted the mind long after the eye had turned away.",
  },
  {
    id: "c2-time",
    level: "C2",
    title: "On the Vanity of Reputation",
    source: "Texto original de ensayo a nivel de maestría",
    body: "Reputation, that most brittle of possessions, is accumulated through years of unremarkable discipline and squandered, with astonishing economy, in a single unguarded moment. The ambitious soon learn that it answers to neither merit nor intention, being fashioned instead in the unreliable imagination of strangers. To devote one's life to its cultivation is therefore to mortgage substance for the sake of appearance. And yet, knowing this, we persist, persuaded that the judgement of others, however capricious, constitutes the only ledger in which our worth may be inscribed.",
  },

  // ------------------------------------- Clásicos de dominio público
  {
    id: "a1-prince",
    level: "A1",
    title: "The Little Prince — Antoine de Saint-Exupéry",
    source: "The Little Prince (dominio público en varios países)",
    body: "Once upon a time there was a little prince who lived on a planet that was scarcely any bigger than himself, and who had need of a friend.",
  },
  {
    id: "a1-peterpan",
    level: "A1",
    title: "Peter Pan — J.M. Barrie",
    source: "Peter Pan (dominio público)",
    body: "All children, except one, grow up. They soon know that they will grow up, and the way Wendy knew was this. One day when she was two years old she was playing in a garden.",
  },
  {
    id: "a1-tortoise",
    level: "A1",
    title: "The Tortoise and the Hare — Esopo",
    source: "Fábula de Esopo (dominio público)",
    body: "A hare was making fun of the tortoise one day for being so slow. Do you ever get anywhere? he asked with a laugh. Yes, replied the tortoise, and I get there sooner than you think.",
  },
  {
    id: "a2-alice",
    level: "A2",
    title: "Alice's Adventures in Wonderland — Lewis Carroll",
    source: "Alice's Adventures in Wonderland (dominio público)",
    body: "Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do. Once or twice she had peeped into the book her sister was reading, but it had no pictures or conversations in it.",
  },
  {
    id: "a2-garden",
    level: "A2",
    title: "The Secret Garden — Frances Hodgson Burnett",
    source: "The Secret Garden (dominio público)",
    body: "When Mary Lennox was sent to Misselthwaite Manor to live with her uncle everybody said she was the most disagreeable-looking child ever seen. It was true, too. She had a little thin face and a little thin light body.",
  },
  {
    id: "a2-willows",
    level: "A2",
    title: "The Wind in the Willows — Kenneth Grahame",
    source: "The Wind in the Willows (dominio público)",
    body: "The Mole had been working very hard all the morning, spring-cleaning his little home. First with brooms, then with dusters, then on ladders and steps and chairs, with a brush and a pail of whitewash.",
  },
  {
    id: "b1-sherlock",
    level: "B1",
    title: "The Adventures of Sherlock Holmes — Arthur Conan Doyle",
    source: "The Adventures of Sherlock Holmes (dominio público)",
    body: "To Sherlock Holmes she is always the woman. I have seldom heard him mention her under any other name. In his eyes she eclipses and predominates the whole of her sex.",
  },
  {
    id: "b1-treasure",
    level: "B1",
    title: "Treasure Island — Robert Louis Stevenson",
    source: "Treasure Island (dominio público)",
    body: "Squire Trelawney, Dr. Livesey, and the rest of these gentlemen having asked me to write down the whole particulars about Treasure Island, to the beginning, keeping nothing back but the bearings of the island.",
  },
  {
    id: "b1-oz",
    level: "B1",
    title: "The Wonderful Wizard of Oz — L. Frank Baum",
    source: "The Wonderful Wizard of Oz (dominio público)",
    body: "Dorothy lived in the midst of the great Kansas prairies, with Uncle Henry, who was a farmer, and Aunt Em, who was the farmer's wife. Their house was small, for the lumber to build it had to be carried by wagon.",
  },
  {
    id: "b2-pride",
    level: "B2",
    title: "Pride and Prejudice — Jane Austen",
    source: "Pride and Prejudice (dominio público)",
    body: "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. However little known the feelings or views of such a man may be on his first entering a neighbourhood.",
  },
  {
    id: "b2-dorian",
    level: "B2",
    title: "The Picture of Dorian Gray — Oscar Wilde",
    source: "The Picture of Dorian Gray (dominio público)",
    body: "The studio was filled with the rich odour of roses, and when the light summer wind stirred amidst the trees of the garden, there came through the open door the heavy scent of the lilac.",
  },
  {
    id: "b2-expectations",
    level: "B2",
    title: "Great Expectations — Charles Dickens",
    source: "Great Expectations (dominio público)",
    body: "My father's family name being Pirrip, and my Christian name Philip, my infant tongue could make of both names nothing longer or more explicit than Pip. So, I called myself Pip, and came to be called Pip.",
  },
  {
    id: "c1-frankenstein",
    level: "C1",
    title: "Frankenstein — Mary Shelley",
    source: "Frankenstein (dominio público)",
    body: "I am by birth a Genevese, and my family is one of the most distinguished of that republic. My ancestors had been for many years counsellors and syndics, and my father had filled several public situations with honour and reputation.",
  },
  {
    id: "c1-mobydick",
    level: "C1",
    title: "Moby Dick — Herman Melville",
    source: "Moby-Dick (dominio público)",
    body: "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
  },
  {
    id: "c1-gatsby",
    level: "C1",
    title: "The Great Gatsby — F. Scott Fitzgerald",
    source: "The Great Gatsby (dominio público desde 2021)",
    body: "In my younger and more vulnerable years my father gave me some advice that I've been turning over in my mind ever since. Whenever you feel like criticizing anyone, he told me, just remember that all the people in this world haven't had the advantages that you've had.",
  },
  {
    id: "c2-ulysses",
    level: "C2",
    title: "Ulysses — James Joyce",
    source: "Ulysses (dominio público)",
    body: "Stately, plump Buck Mulligan came from the stairhead, bearing a bowl of lather on which a mirror and a razor lay crossed. A yellow dressinggown, ungirdled, was sustained gently behind him by the mild morning air.",
  },
  {
    id: "c2-heart",
    level: "C2",
    title: "Heart of Darkness — Joseph Conrad",
    source: "Heart of Darkness (dominio público)",
    body: "The Nellie, a cruising yawl, swung to her anchor without a flutter of the sails, and was at rest. The flood had made, the wind was nearly calm, and being bound down the river, the only thing for it was to come to and wait for the turn of the tide.",
  },
  {
    id: "c2-lighthouse",
    level: "C2",
    title: "To the Lighthouse — Virginia Woolf",
    source: "To the Lighthouse (dominio público)",
    body: "Yes, of course, if it's fine tomorrow, said Mrs Ramsay. But you'll have to be up with the lark, she added. To her son these words conveyed an extraordinary joy, as if it were settled the expedition were bound to take place.",
  },
];

export function getTextsByLevel(level: Level): TypingText[] {
  return TEXTS.filter((text) => text.level === level);
}
