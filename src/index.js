class Player {
    constructor(nome, velocidade, manobrabilidade, poder) {
      this.nome = nome;
      this.velocidade = velocidade;
      this.manobrabilidade = manobrabilidade;
      this.poder = poder;
      this.pontos = 0;
    }
  }
  
  const players = [
    new Player("Mario", 4, 3, 3),
    new Player("Luigi", 3, 4, 4),
    new Player("Peach", 3, 4, 2),
    new Player("Yoshi", 2, 4, 3),
    new Player("Bowser", 5, 2, 5),
    new Player("Donkey Kong", 2, 2, 5)
  ];
  
  function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }
  
  function getRandomBlock() {
    const random = Math.random();
  
    if (random < 0.33) {
      return "RETA";
    } else if (random < 0.66) {
      return "CURVA";
    } else {
      return "CONFRONTO";
    }
  }
  
  function logRollResult(player, attribute, diceResult, attributeValue) {
    console.log(
      `${player.nome} 🎲 rolou um dado de ${attribute} ${diceResult} + ${attributeValue} = ${
        diceResult + attributeValue
      }`
    );
  }
  
  function playRaceEngine(players) {
    const [player1, player2] = players;
  
    for (let round = 1; round <= 5; round++) {
      console.log(`🏁 Rodada ${round}`);
  
      const block = getRandomBlock();
      console.log(`Bloco: ${block}`);
  
      const diceResult1 = rollDice();
      const diceResult2 = rollDice();
  
      let totalTestSkill1 = 0;
      let totalTestSkill2 = 0;
  
      switch (block) {
        case "RETA":
          totalTestSkill1 = diceResult1 + player1.velocidade;
          totalTestSkill2 = diceResult2 + player2.velocidade;
          logRollResult(player1, "velocidade", diceResult1, player1.velocidade);
          logRollResult(player2, "velocidade", diceResult2, player2.velocidade);
          break;
        case "CURVA":
          totalTestSkill1 = diceResult1 + player1.manobrabilidade;
          totalTestSkill2 = diceResult2 + player2.manobrabilidade;
          logRollResult(player1, "manobrabilidade", diceResult1, player1.manobrabilidade);
          logRollResult(player2, "manobrabilidade", diceResult2, player2.manobrabilidade);
          break;
        case "CONFRONTO":
          const powerResult1 = diceResult1 + player1.poder;
          const powerResult2 = diceResult2 + player2.poder;
          console.log(`${player1.nome} confrontou com ${player2.nome}! 🥊`);
          logRollResult(player1, "poder", diceResult1, player1.poder);
          logRollResult(player2, "poder", diceResult2, player2.poder);
  
          if (powerResult1 > powerResult2 && player2.pontos > 0) {
            console.log(`${player1.nome} venceu o confronto! ${player2.nome} perdeu 1 ponto 🐢`);
            player2.pontos--;
          } else if (powerResult2 > powerResult1 && player1.pontos > 0) {
            console.log(`${player2.nome} venceu o confronto! ${player1.nome} perdeu 1 ponto 🐢`);
            player1.pontos--;
          } else {
            console.log("Confronto empatado! Nenhum ponto foi perdido");
          }
          break;
      }
  
      if (totalTestSkill1 > totalTestSkill2) {
        console.log(`${player1.nome} marcou um ponto!`);
        player1.pontos++;
      } else if (totalTestSkill2 > totalTestSkill1) {
        console.log(`${player2.nome} marcou um ponto!`);
        player2.pontos++;
      }
  
      console.log("-----------------------------");
    }
  }
  
  function declareWinner(players) {
    const [player1, player2] = players;
  
    console.log("Resultado final:");
    console.log(`${player1.nome}: ${player1.pontos} ponto(s)`);
    console.log(`${player2.nome}: ${player2.pontos} ponto(s)`);
  
    if (player1.pontos > player2.pontos) {
      console.log(`\n${player1.nome} venceu a corrida! Parabéns! 🏆`);
    } else if (player2.pontos > player1.pontos) {
      console.log(`\n${player2.nome} venceu a corrida! Parabéns! 🏆`);
    } else {
      console.log("A corrida terminou em empate");
    }
  }
  
  function main() {
    const randomIndices = [
      Math.floor(Math.random() * players.length),
      Math.floor(Math.random() * players.length)
    ];
  
    while (randomIndices[0] === randomIndices[1]) {
      randomIndices[1] = Math.floor(Math.random() * players.length);
    }
  
    const selectedPlayers = [
      players[randomIndices[0]],
      players[randomIndices[1]]
    ];
  
    console.log(
      `🏁🚨 Corrida entre ${selectedPlayers[0].nome} e ${selectedPlayers[1].nome} começando...\n`
    );
  
    playRaceEngine(selectedPlayers);
    declareWinner(selectedPlayers);
  }
  
  main();
  