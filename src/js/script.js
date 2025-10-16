// ====================================
// 1. SELETORES DO DOM
// ====================================

const timeDisplay = document.getElementById('timeDisplay');
const dateDisplay = document.getElementById('dateDisplay');
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// ====================================
// 2. FUNÇÃO PRINCIPAL DO RELÓGIO
// ====================================

/*
    Atualiza o relógio (hora e data) na tela.
    Esta função será chamada a cada segundo usando setInterval().
*/

function updateClock() {
    const now = new Date(); // Cria um novo objeto Date com o horário atual
    // Formata a hora no formato HH:MM:SS

    // Obtém hora, minuto e segundo e garante que tenham 2 dígitos (ex: 09, 10)
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    //MONTA A STRING DA HORA
    const timeString = `${hours}:${minutes}:${seconds}`;

    // ATUALIZA O ELEMENTO DE HORA NO DOM
    timeDisplay.textContent = timeString;

    // --- FORMATAÇÃO DA DATA ---

    // CONFIGURAÇÃO DE FORMATAÇÃO PARA O BRASIL (PT-BR)
    const options = {
        weekday: 'short', //ex: 'seg'
        day: '2-digit', //ex: '05'
        month: 'short', //ex: 'Out'
    };

    // Usa Intl.DateTimeFormat para formatar a data de forma amigável
    // Ex: "Ter, 15 de Out"

    const dateString = new Intl.DateTimeFormat('pt-BR', options).format(now)
        .replace('.', ''); // Remove o ponto de abreviação (ex: "Out.")
    
    // Converte a primeira letra do dia para maiúscula para melhor visual (Ex: ter -> Ter)
    const formattedDate = dateString.charAt(0).toUpperCase() + dateString.slice(1);

    // Atualiza o elemento de data no DOM
    dateDisplay.textContent = formattedDate;
}

// ====================================
// 3. EXTRA: MODO ESCURO
// ====================================

function toggleTheme() {
    //Alterna a classe 'dark-mode' no body
    body.classList.toggle('dark-mode');

    //Salva a preferência do usuário no localStorage
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');

    // Opcional: Atualiza o texto do botão
    themeToggle.textContent = isDarkMode ? 'Modo Claro' : 'Modo Escuro';
}

/*
    CARREGA O TEMA PREFERIDO DO USUARIO AO INICIAR.
*/
function loadTheme() {
    const savedTheme = localStorage.getItem('theme');

    // Se o tema for 'dark' ou se não houver tema salvo, mas o sistema operacional for escuro
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        // Adiciona a classe dark-mode, mas sem usar toggleTheme para não salvar 'dark' 2x
        body.classList.add('dark-mode');
        themeToggle.textContent = 'Modo Claro';
    } else {
        themeToggle.textContent = 'Modo Escuro';
    }
}

// ====================================
// 4. INICIANDO O PROJETO
// ====================================

// Carrega o tema antes de tudo
loadTheme();

// Define o evento de clique para o botão do tema
themeToggle.addEventListener('click', toggleTheme);

// Chama a função uma vez imediatamente para evitar atraso de 1 segundo
updateClock();

// Configura o loop principal: chama upDateClock a cada 1000ms (1 segundo)
setInterval(updateClock, 1000);