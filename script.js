//controle geral da aplicacao (main)
const Main = {
    //funcao inicial que irar "chamar" todas funcoes
    init: function(){
        //this se refere ao Main(pai)
        //selelciona todas as funcoes que precisa
        this.cacheSelectors();
        //depois adciona os eventos a todos
        this.bindEvents();


    },//end init

    //responsavel por selecionar os elementos do html e reservar na variavel(criando as variaveis)
    cacheSelectors: function(){
         //1. variavel para selecionar a div com class check
        this.$checkButtons = document.querySelectorAll('.check');

        //2. variavel para selecionar o input inputTask, onde o ususario vai entrar com a tarefa
        this.$inputTask = document.querySelector('#inputTask');
        this.$list = document.querySelector('#list');

         //3. variavel para remover a tarefa
         this.$removeButtons = document.querySelectorAll('.remove');

    },//end cacheSelectors

    //responsavel por criar os eventos de click/enter atraves das variaveis criadas no cacheSelectors
    bindEvents: function(){
        const self = this;//self se refere ao Main
        //1.1 evento do click
        this.$checkButtons.forEach(function(button){
            button.onclick = self.Events.checkButton_click;
        });
        //2.1 evento do input
        this.$inputTask.onkeypress = self.Events.inputTask_keypress.bind(this);//bind(this)  é para conectar essa funcao ao Main

        //3.1 evento do botao remover tarefa
        this.$removeButtons.forEach(function(button){
            button.onclick = self.Events.removeButton_click;
        });

    },//end bindEvents
    
    //aqui que vai ficar as funcoes que serão chamadas no bindEvents
    Events: {
        //evento de click no checkbutton
        checkButton_click: function(e) {

            //1.1.1 evento para marcar a div com class check tarefa como concluida ou não
            const li = e.target.parentElement;
            const isDone = li.classList.contains('done');

            if(isDone){
                li.classList.remove('done');
            }else{
                li.classList.add('done');
            }

        },
        //2.1.1 evento para marcar incluir nova tarefa ao apertar o enter
            
        inputTask_keypress: function(e) {
                const key = e.key;
                const value = e.target.value;

                if(key === 'Enter'){
                    this.$list.innerHTML += 
                      `  <li>
                            <div class="check"></div>
                            <label class="task">${value}</label>
                            <button class="remove"></button>
                        </li>
                      `;
                      e.target.value = '';

                      //chamando os eventos novamente para funcionar depois que adiciona uma nova tarefa
                      this.cacheSelectors();
                      this.bindEvents();
                }
         },


        //3.1.1 evento para remover a tarefa ao clicar 
        removeButton_click: function(e){
            let li = e.target.parentElement;
            li.classList.add('removed');

            setTimeout(function(){
                li.classList.add('hidden');
            }, 300);
        }






        }//end Events
};//end Main




//chamando a funcao Main.init para iniciar todas as funcoes
Main.init();