// ==============================
// Importação de bibliotecas
// ==============================
const readline = require('readline');

// ==============================
// Configuração do Readline
// ==============================
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ==============================
// Declaração de variáveis globais
// ==============================
let incompleteTasks = [];
let completedTasks = [];

// ==============================
// Funções principais
// ==============================

// Função para ler a entrada do usuário de forma assíncrona
const question = (query) => new Promise(resolve => rl.question(query, resolve));

// Função para adicionar uma tarefa
async function addTask() {
    const userTask = await question('\nDigite a sua tarefa a ser feita: ');
    if(userTask=== ''){
        console.log('Digite um valor valido...');
        addTask();
        return;
    }
    incompleteTasks.push({ description: userTask, completed: false });
    console.log('A tarefa foi adicionada com sucesso...');
    showMenu();  // Chama o menu novamente após adicionar a tarefa
}

// Função para listar as tarefas incompletas
async function listIncompleteTasks() {
    if (incompleteTasks.length === 0) {
        console.log('\nVocê não tem nenhuma tarefa listada!');
    } else {
        console.log(`\nVocê tem ${incompleteTasks.length} tarefa(s) para ser(em) feita(s):`);
        incompleteTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description}`);
        });
    }
    showMenu();  // Chama o menu novamente após listar as tarefas
}

// Função para listar as tarefas concluídas
async function listCompletedTasks() {
    if (completedTasks.length === 0) {
        console.log('\nVocê ainda não concluiu nenhuma tarefa!');
    } else {
        console.log(`\nVocê concluiu ${completedTasks.length} tarefa(s), e elas são:`);
        completedTasks.forEach((task, index) => {
            console.log(`${index + 1}. ${task.description}`);
        });
    }
    showMenu();  // Chama o menu novamente após listar as tarefas
}

// Função para marcar uma tarefa como concluída
async function completTasks() {
    if (incompleteTasks.length === 0) {
        console.log("\nVocê não tem tarefas para marcar como concluídas.");
        showMenu();  // Chama o menu se não houver tarefas
        return;
    }

    // Exibe as tarefas incompletas
    console.log('\nLista de tarefas não concluídas:');
    incompleteTasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task.description}`);
    });

    // Pergunta ao usuário qual tarefa foi concluída
    const checkTask = await question('\nDigite o número da tarefa que foi concluída: ');
    const index = parseInt(checkTask) - 1;

    // Valida se a entrada é válida
    if (isNaN(index) || index < 0 || index >= incompleteTasks.length) {
        console.log("\nPor favor, insira um número válido de tarefa...");
        completTasks();  // Chama novamente se a entrada for inválida
    } else {
        // Move a tarefa para o array de tarefas concluídas
        const taskCompleted = incompleteTasks.splice(index, 1)[0];
        taskCompleted.completed = true;
        completedTasks.push(taskCompleted);
        console.log('\nEssa tarefa foi concluída...');
        showMenu();  // Chama o menu novamente após a conclusão
    }
}

// ==============================
// Função para exibir o menu de opções
// ==============================
async function showMenu() {
    console.log('\nTo do List\n' +
        'Escolha o que fazer:\n' +
        '    (1) Adicionar tarefa\n' +
        '    (2) Listar tarefas incompletas\n' +
        '    (3) Marcar tarefa como concluída\n' +
        '    (4) Listar tarefas concluídas\n' +
        '    (5) Sair');

    // Pergunta ao usuário o que ele quer fazer
    const option = await question('Digite uma ação: \n');

    // Executa a ação baseada na escolha do usuário
    switch (option) {
        case '1':
            await addTask();  // Chama a função para adicionar uma tarefa
            break;
        case '2':
            await listIncompleteTasks();  // Chama a função para listar as tarefas incompletas
            break;
        case '3':
            await completTasks();  // Chama a função para concluir uma tarefa
            break;
        case '4':
            await listCompletedTasks();  // Chama a função para listar as tarefas concluídas
            break;
        case '5':
            rl.close();  // Fecha o readline e encerra o programa
            break;
        default:
            console.log('Opção inválida...');
            await showMenu();  // Chama novamente o menu se a opção for inválida
            break;
    }
}

// ==============================
// Inicializa o programa chamando o menu
// ==============================
showMenu();
