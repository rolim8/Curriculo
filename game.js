// Cores disponíveis para os blocos
const colors = ["red", "blue", "green", "yellow", "purple"];

// Tamanho do grid (5 colunas x 3 linhas)
const gridSize = { cols: 5, rows: 3 };

// Variáveis para controle do jogo
let gameBoard = [];
let removedTiles = 0;
let selectedTiles = []; // Armazena os blocos selecionados

// Função para criar o tabuleiro
function createBoard() {
  const gameContainer = document.getElementById("game-container");
  const gameElement = document.createElement("div");
  gameElement.id = "game";
  gameContainer.appendChild(gameElement);

  // Distribuir 3 blocos de cada cor
  const totalTiles = gridSize.cols * gridSize.rows;
  const tilesPerColor = 3;
  const colorDistribution = [];

  colors.forEach((color) => {
    for (let i = 0; i < tilesPerColor; i++) {
      colorDistribution.push(color);
    }
  });

  // Embaralhar as cores
  colorDistribution.sort(() => Math.random() - 0.5);

  // Criar os blocos
  for (let row = 0; row < gridSize.rows; row++) {
    gameBoard[row] = [];
    for (let col = 0; col < gridSize.cols; col++) {
      const tile = document.createElement("div");
      tile.classList.add("tile");
      tile.dataset.row = row;
      tile.dataset.col = col;
      tile.dataset.color = colorDistribution.pop();
      tile.addEventListener("click", () => onTileClick(tile));
      gameElement.appendChild(tile);
      gameBoard[row][col] = tile;
    }
  }
}

// Função para lidar com o clique em um bloco
function onTileClick(tile) {
  if (tile.classList.contains("removed")) return; // Ignorar blocos já removidos

  // Verificar se o bloco já está selecionado
  if (tile.classList.contains("selected")) {
    tile.classList.remove("selected"); // Desselecionar o bloco
    selectedTiles = selectedTiles.filter(
      (selectedTile) => selectedTile !== tile
    );
    return;
  }

  // Verificar se o bloco é da mesma cor dos já selecionados
  if (
    selectedTiles.length > 0 &&
    tile.dataset.color !== selectedTiles[0].dataset.color
  ) {
    // Resetar a seleção se a cor for diferente
    selectedTiles.forEach((selectedTile) =>
      selectedTile.classList.remove("selected")
    );
    selectedTiles = [];
  }

  // Adicionar o bloco à seleção
  tile.classList.add("selected");
  selectedTiles.push(tile);

  // Verificar se três blocos da mesma cor foram selecionados
  if (selectedTiles.length === 3) {
    // Remover os blocos selecionados
    selectedTiles.forEach((selectedTile) => {
      selectedTile.classList.add("removed");
      removedTiles++;
    });

    // Resetar a seleção
    selectedTiles = [];

    // Verificar se todos os blocos foram removidos
    if (removedTiles === gridSize.cols * gridSize.rows) {
      // Ocultar a seção do jogo
      document.getElementById("game-section").style.display = "none";
      // Exibir a seção de assinatura
      document.getElementById("signature-section").style.display = "block";
    }
  }
}

// Inicializar o jogo
createBoard();
