function log(message) {
    console.log(message);
}

let { createApp } = Vue;

let app = createApp({
    data() {
        let months = [
            'январь',
            'февраль',
            'март',
            'апрель',
            'май',
            'июнь',
            'июль',
            'август',
            'сентябрь',
            'октябрь',
            'ноябрь',
            'декабрь',
        ];

        var rows = [];

        for (var i = 0; i < 10; i++) {
            rows[i] = [];

            for (var j = 0; j < months.length; j++) {
                rows[i].push(i * j);
            }
        }

        return {
            console: console,
            rows: rows,
            months: months,
            numbersValue: '',
            selectedRow: 0,
            selectedMonth: 0,
        };
    },
    computed: {
        isSaveActive() {
            return (
                this.selectedMonth != 0 &&
                this.selectedRow != 0 &&
                this.numbersValue.length > 0
            );
        },
        isResetActive() {
            return (
                this.selectedMonth != 0 ||
                this.selectedRow != 0 ||
                this.numbersValue.length > 0
            );
        },
        sums() {
            var sums = [];

            for (var row of this.rows) {
                var sum = 0;

                for (var cell of row) {
                    sum += cell;
                }

                sums.push(sum);
            }
            return sums;
        },
        totals() {
            var sums = [];

            for (var j = 0; j < this.months.length; j++) {
                var sum = 0;

                for (var row of this.rows) {
                    sum += row[j];
                }

                sums.push(sum);
            }
            return sums;
        },
        totalSum() {
            var total = 0;

            for (var sum of this.sums) {
                total += sum;
            }

            return total;
        },
    },
    methods: {
        reset() {
            this.selectedMonth = 0;
            this.selectedRow = 0;
            this.numbersValue = '';
        },
        save() {
            if (this.selectedRow && this.selectedMonth) {
                var value = this.numbersValue;
                this.rows[this.selectedRow - 1][this.selectedMonth - 1] =
                    Number(value);
            }
        },
        validate(event) {
            if (event.key.match(/\D/) && ![8, 13].includes(event.keyCode)) {
                event.preventDefault();
            }
        },
    },
});

app.mount('body');
