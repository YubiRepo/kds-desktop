export const helper = {
    methods: {
        formatRupiah(number) {
            if (number === null || number === undefined || number === '') {
                return 'Rp. 0'
            }

            let val = (number / 1).toFixed(0).replace('.', '')
            return 'Rp. ' + val.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        mustBeNumber(evt) {
            const keysAllowed = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
            const keyPressed = evt.key;

            if (!keysAllowed.includes(keyPressed)) {
                evt.preventDefault();
            }

            if (!evt.target.value) {
                evt.target.value = 0;
                evt.preventDefault();
            }

            // qty cant be negative
            if (parseInt(evt.target.value) < 0) {
                evt.target.value = 0;
                evt.preventDefault();
            }
        },
    }
}