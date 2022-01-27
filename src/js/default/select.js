class ShadowSelect {
    constructor(select, {
        data,
        inputName = 'shadow_name',
        inputClass = 'shadow_search',
        outputClass = 'shadow_output',
        containerClass = 'shadow_container',
        minLetters = 0,
        outputItemClass = 'shadow_item'
    }) {
        this.data = data;
        this.select = document.querySelector(select);
        this.minLetters = minLetters;
        this.inputClass = inputClass;
        this.inputName = inputName;
        this.containerClass = containerClass;
        this.outputClass = outputClass;
        this.outputItemClass = outputItemClass;

        this.input = document.createElement('input');
        this.output = document.createElement('output');
    };

    CreateStructure() {
        this.select.classList.add(this.containerClass);

        this.input.classList.add(this.inputClass);
        this.input.setAttribute('name', this.inputName);

        this.output.classList.add(this.outputClass);

        this.select.append(this.input);
        this.select.append(this.output);
    }

    Search(value) {
        let result = [];
        if (this.input.value.length > this.minLetters) {
            for (let x = 0; x < this.data.length; x++) {
                let val = this.data[x].trim().toLowerCase().indexOf(value.trim().toLowerCase());
                if (val != -1) {
                    result.push(this.data[x]);
                }
            }
            this.Draw(result);
        } else {
            this.Hide();
            this.Clear();
        }
    }

    Draw(results) {
        this.Show();
        let output = this.select.querySelector(`.${this.outputClass}`);
        this.Clear();
        results.forEach((item, i) => {
            let container = document.createElement('div');
            container.classList = this.outputItemClass;
            container.textContent = item
            output.prepend(container);
            this.setClick(container, item);
        });
    }

    Clear() {
        let output_items = this.select.querySelector(`.${this.outputClass}`).childNodes;
        output_items.forEach((item, i) => {
            item.remove();
        });
    }

    setClick(item, value) {
        item.onclick = () => {
            this.setValue(value);
        };
    }

    setValue(value) {
        this.input.value = value;
        this.Hide();
        this.Clear();
    }

    Hide() {
        return this.output.classList.add('hide');
    }

    Show() {
        return this.output.classList.remove('hide');
    }

    create() {
        if (this.select) {
            this.CreateStructure();
            let inp = this.select.querySelector(`.${this.inputClass}`);
            inp.oninput = () => {
                this.Search(inp.value);
            };
        } else {
            return 'no select';
        }
    }

}