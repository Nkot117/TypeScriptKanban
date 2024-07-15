class TaskForm {
    // 入力フォーム
    element: HTMLFormElement;
    // タイトル入力欄
    titleInputElement: HTMLInputElement;
    // 詳細入力欄
    descriptionInputElement: HTMLInputElement;

    constructor() {
        this.element = document.querySelector("#task-form") as HTMLFormElement;
        this.titleInputElement = document.querySelector("#form-title") as HTMLInputElement;
        this.descriptionInputElement = document.querySelector("#form-description") as HTMLInputElement;

        // イベントリスナーの登録
        this.bindEvents()
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        
        console.log(this.titleInputElement.value);
        console.log(this.descriptionInputElement.value);
    }

    private bindEvents() {
        // bindメソッドを使って、submitHandlerメソッド内のthisがTaskFormクラスのインスタンスを指すようにする
        this.element.addEventListener("submit", this.submitHandler.bind(this))  ;
    }
}

new TaskForm();