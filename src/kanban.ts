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
        this.bindEvents();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        
        const task = this.createTask();
        console.log(task);

        this.clearInputs();
    }

    private bindEvents() {
        // bindメソッドを使って、submitHandlerメソッド内のthisがTaskFormクラスのインスタンスを指すようにする
        this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    private clearInputs() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
    }

    private createTask(): Task {
        return {
            title: this.titleInputElement.value,
            description: this.descriptionInputElement.value
        };
    }
}

interface Task {
    title: string;
    description?: string;
}

new TaskForm();