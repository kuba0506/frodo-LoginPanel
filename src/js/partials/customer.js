var customer = (function () {
    function customer(name) {
        this.name = name;
    }
    customer.prototype.getName = function () {
        return this.name;
    };
    return customer;
})();

//# sourceMappingURL=customer.js.map
