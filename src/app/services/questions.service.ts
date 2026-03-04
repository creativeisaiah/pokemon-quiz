// src/app/services/questions.service.ts
import { Injectable } from '@angular/core';

export interface Question {
  id: string;
  question: string;
  options: string[];
  answerIndex: number;
}

@Injectable({ providedIn: 'root' })
export class QuestionsService {
  private readonly STORAGE_KEY = 'pokemon_quiz_questions';

  constructor() {
    // Seed defaults on first run
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.defaultQuestions()));
    }
  }

  getAllQuestions(): Question[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Question[]) : [];
  }

  getQuestionById(id: string): Question | null {
    return this.getAllQuestions().find(q => q.id === id) ?? null;
  }

  addQuestion(data: Omit<Question, 'id'>): void {
    const all = this.getAllQuestions();
    const newQ: Question = { ...data, id: crypto.randomUUID() };
    all.push(newQ);
    this.save(all);
  }

  updateQuestion(id: string, data: Omit<Question, 'id'>): void {
    const all = this.getAllQuestions();
    const idx = all.findIndex(q => q.id === id);
    if (idx !== -1) {
      all[idx] = { ...data, id };
      this.save(all);
    }
  }

  deleteQuestion(id: string): void {
    const all = this.getAllQuestions().filter(q => q.id !== id);
    this.save(all);
  }

  private save(questions: Question[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(questions));
  }

  private defaultQuestions(): Question[] {
    return [
      { id: crypto.randomUUID(), question: 'Which type is Pikachu?', options: ['Fire', 'Water', 'Electric', 'Grass'], answerIndex: 2 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves into Charizard?', options: ['Bulbasaur', 'Charmander', 'Squirtle', 'Eevee'], answerIndex: 1 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Water?', options: ['Fire', 'Grass', 'Rock', 'Ice'], answerIndex: 1 },
      { id: crypto.randomUUID(), question: 'What is the Pokédex number of Bulbasaur in Kanto?', options: ['#001', '#004', '#007', '#025'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which item is used to catch Pokémon?', options: ['Potion', 'Poké Ball', 'Rare Candy', 'Escape Rope'], answerIndex: 1 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is known as the "Seed Pokémon"?', options: ['Bulbasaur', 'Oddish', 'Chikorita', 'Bellsprout'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'What type is Charmander?', options: ['Fire', 'Dragon', 'Rock', 'Normal'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'What type is Squirtle?', options: ['Water', 'Ice', 'Rock', 'Steel'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves from Eevee using a Water Stone?', options: ['Vaporeon', 'Jolteon', 'Flareon', 'Espeon'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is #150 in the Kanto Pokédex?', options: ['Mew', 'Mewtwo', 'Dragonite', 'Articuno'], answerIndex: 1 },
      { id: crypto.randomUUID(), question: 'Which item heals a Pokémon by 20 HP?', options: ['Potion', 'Antidote', 'Revive', 'Escape Rope'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Fire?', options: ['Water', 'Grass', 'Bug', 'Ice'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Electric?', options: ['Ground', 'Water', 'Flying', 'Steel'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is immune to Electric moves?', options: ['Rock', 'Ground', 'Ice', 'Dark'], answerIndex: 1 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is known for sleeping a lot and blocking roads?', options: ['Snorlax', 'Slaking', 'Jigglypuff', 'Psyduck'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves into Raichu?', options: ['Pichu', 'Pikachu', 'Plusle', 'Minun'], answerIndex: 1 },
      { id: crypto.randomUUID(), question: 'Which move type is NOT very effective against Grass?', options: ['Fire', 'Ice', 'Water', 'Flying'], answerIndex: 2 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Psychic?', options: ['Dark', 'Normal', 'Electric', 'Grass'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a dual-type Water/Flying in Gen 1?', options: ['Gyarados', 'Golduck', 'Lapras', 'Tentacruel'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves from Magikarp?', options: ['Gyarados', 'Seadra', 'Milotic', 'Sharpedo'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is the final evolution of the Abra line?', options: ['Alakazam', 'Kadabra', 'Hypno', 'Gengar'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is Ghost/Poison in Gen 1?', options: ['Gengar', 'Misdreavus', 'Haunter', 'Gastly'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves from Gastly?', options: ['Haunter', 'Gengar', 'Misdreavus', 'Duskull'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves from Haunter?', options: ['Gengar', 'Crobat', 'Banette', 'Sableye'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is immune to Normal moves?', options: ['Ghost', 'Rock', 'Steel', 'Dark'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Rock?', options: ['Water', 'Fire', 'Flying', 'Electric'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a starter in Johto?', options: ['Cyndaquil', 'Torchic', 'Chimchar', 'Tepig'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a starter in Hoenn?', options: ['Treecko', 'Chikorita', 'Turtwig', 'Bulbasaur'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Dragon?', options: ['Ice', 'Electric', 'Grass', 'Rock'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is known as the "Fire Horse Pokémon" (Gen 1)?', options: ['Ponyta', 'Rapidash', 'Arcanine', 'Growlithe'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves into Blastoise?', options: ['Wartortle', 'Squirtle', 'Poliwhirl', 'Totodile'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves into Venusaur?', options: ['Ivysaur', 'Bulbasaur', 'Chikorita', 'Bayleef'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves into Charizard?', options: ['Charmeleon', 'Charmander', 'Vulpix', 'Growlithe'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which item revives a fainted Pokémon with half HP?', options: ['Revive', 'Potion', 'Full Restore', 'Max Potion'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is Electric-type and looks like a mouse?', options: ['Pikachu', 'Meowth', 'Sandshrew', 'Rattata'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is famous for saying its own name?', options: ['Pikachu', 'Ditto', 'Eevee', 'Psyduck'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is known for transforming into others?', options: ['Ditto', 'Eevee', 'Zoroark', 'Mew'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Fighting?', options: ['Flying', 'Rock', 'Steel', 'Normal'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Ground?', options: ['Water', 'Electric', 'Fire', 'Rock'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a Water/Psychic type in Gen 1?', options: ['Starmie', 'Slowbro', 'Golduck', 'Jynx'], answerIndex: 1 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves from Slowpoke?', options: ['Slowbro', 'Slowking', 'Psyduck', 'Poliwag'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is the final evolution of the Pidgey line?', options: ['Pidgeot', 'Fearow', 'Noctowl', 'Dodrio'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a Normal-type cat known for coins?', options: ['Meowth', 'Persian', 'Eevee', 'Skitty'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves into Butterfree?', options: ['Metapod', 'Caterpie', 'Weedle', 'Kakuna'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon evolves into Beedrill?', options: ['Kakuna', 'Weedle', 'Caterpie', 'Metapod'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is known as the "Mouse Pokémon" in Kanto?', options: ['Pikachu', 'Raichu', 'Rattata', 'Sandshrew'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a legendary bird of Ice type?', options: ['Articuno', 'Zapdos', 'Moltres', 'Lugia'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a legendary bird of Electric type?', options: ['Zapdos', 'Articuno', 'Moltres', 'Ho-Oh'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a legendary bird of Fire type?', options: ['Moltres', 'Zapdos', 'Articuno', 'Entei'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is known as the "Dragon Pokémon" and is #149 in Kanto?', options: ['Dragonite', 'Dragonair', 'Dratini', 'Gyarados'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Flying?', options: ['Electric', 'Ground', 'Fighting', 'Bug'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which type is super effective against Poison?', options: ['Ground', 'Fire', 'Electric', 'Normal'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is known for singing lullabies?', options: ['Jigglypuff', 'Clefairy', 'Chansey', 'Eevee'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a fossil Pokémon from Kanto?', options: ['Omanyte', 'Lapras', 'Seel', 'Shellder'], answerIndex: 0 },
      { id: crypto.randomUUID(), question: 'Which Pokémon is a fossil Pokémon that evolves into Kabutops?', options: ['Kabuto', 'Omanyte', 'Aerodactyl', 'Anorith'], answerIndex: 0 },
    ];
  }
}