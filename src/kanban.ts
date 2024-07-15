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

class TaskList {
    // テンプレート要素
    templateElement: HTMLTemplateElement;
    // テンプレートからコピーした要素
    element: HTMLDivElement;
    // タスクの状態
    private taskStatus;
    constructor(templateId: string, _taskStatus: string) {
        // テンプレート要素を取得
        this.templateElement = document.querySelector(templateId) as HTMLTemplateElement;

        // テンプレート要素のコピーを作成
        const templateClone = this.templateElement!.content.cloneNode(true) as DocumentFragment;

        // コピーした要素の最初の子要素を取得
        // <div class="tasks">
        //   <h2 class="list-title"></h2>
        //   <ul id="list">
        //     <!-- タスクを追加する -->
        //   </ul>
        // </div>
        this.element = templateClone.firstElementChild as HTMLDivElement;

        this.taskStatus = _taskStatus;

        this.setup();
    }

    setup() {
        // タスクの状態を設定
        this.element.querySelector("h2")!.textContent = this.taskStatus;

        // id属性を設定
        this.element.querySelector("ul")!.id = `$(this.taskStatus)`;
    }

    mount(selector: string) {
        const targetElement = document.querySelector(selector);
        targetElement?.insertAdjacentElement("beforeend", this.element);
    }
}

// タスクの状態を定義
const TASK_STATUS = ["todo", "working", "done"] as const;
type TaskStatus = (typeof TASK_STATUS)[number];

new TaskForm();

TASK_STATUS.forEach((status) => {
    const list = new TaskList("#task-list-template", status);
    list.mount("#container");
});