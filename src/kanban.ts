abstract class UIComponent<T extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    element: T;

    constructor(selector: string) {
        this.templateElement = document.querySelector(selector) as HTMLTemplateElement;

        const clone = this.templateElement.content.cloneNode(true) as DocumentFragment;

        this.element = clone.firstElementChild as T;
    }

    mount(selector: string) {
        const targetElement = document.querySelector(selector);
        targetElement?.insertAdjacentElement("beforeend", this.element);
    }

    abstract setup(): void

    abstract setup(): void;
}

interface ClickableElement {
    element: HTMLElement;
    clickHandler(event: MouseEvent): void;
    bindEvents(): void;
}

interface Task {
    title: string;
    description?: string;
}

// タスクの状態を定義
const TASK_STATUS = ["todo", "working", "done"] as const;
type TaskStatus = (typeof TASK_STATUS)[number];

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
        const item = new TaskItem(task);
        item.mount("#todo");
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

class TaskList extends UIComponent<HTMLDivElement> {
    constructor(private taskStatus: TaskStatus) {
        super("#task-list-template");
        this.setup();
    }

    setup() {
        // タスクの状態を設定
        this.element.querySelector("h2")!.textContent = this.taskStatus;

        // id属性を設定
        this.element.querySelector("ul")!.id = `${this.taskStatus}`;
    }
}

class TaskItem extends UIComponent<HTMLElement> implements ClickableElement {
    task: Task;

    constructor(_task: Task) {
        super("#task-item-template");

        this.task = _task;
        this.setup();
        this.bindEvents();
    }

    setup() {
        this.element.querySelector("h2")!.textContent = `${this.task.title}`;
        this.element.querySelector("p")!.textContent = `${this.task.description}`;
    }

    clickHandler() {
        console.log("click");
        if (!this.element.parentElement) return;

        const currentListId = this.element.parentElement.id as TaskStatus;
        const taskStatusIdx = TASK_STATUS.indexOf(currentListId);

        if (taskStatusIdx == -1) {
            throw new Error("invalid task status");
        }

        const nextListId = TASK_STATUS[taskStatusIdx + 1] as TaskStatus;

        if (nextListId) {
            const newstListElement = document.querySelector(`#${nextListId}`) as HTMLUListElement;
            newstListElement.appendChild(this.element);
            return;
        }

        this.element.remove();
    }

    bindEvents() {
        this.element.addEventListener("click", this.clickHandler.bind(this));
    }
}

new TaskForm();

TASK_STATUS.forEach((status) => {
    const list = new TaskList(status);
    list.mount("#container");
});