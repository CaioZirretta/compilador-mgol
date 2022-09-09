const a = [
	{ id: 1, value: "literal" },
	{ id: 2, value: "real" },
	{ id: 3, value: "c" },
	{ id: 4, value: "d" },
	{ id: 5, value: "e" },
	{ id: 6, value: "f" },
	{ id: 7, value: "g" },
];

console.log(
	a.filter((s) => {
		if (s.id === 5) {
			return s.value;
		}
	})
);
