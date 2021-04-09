let id = 0;

class ListItemData {
    constructor(value) {
        this.value = value;
        this.completed = false;
        this.active = true;
        this.id = id;
        id++;
    }

    static generateCompleted(value) {
        const item = new ListItemData(value);

        item.completed = true;
        item.active = false;

        return item;
    }

    static toJSON(obj) {
        return { ...obj };
    }
}

export default ListItemData;
