/**
 * Filter operations based on path, summary (title) and description
 * @function
 * @param {object} system - swagger system
 * @return {object} Override opsFilter function
 */
 function advancedFilterPlugin (system) {

	return {
		fn: {
			opsFilter: function (taggedOps, phrase) {
				phrase = phrase.toLowerCase();

				const normalTaggedOps = JSON.parse(JSON.stringify(taggedOps));

				for (tagObj in normalTaggedOps) {
					const operations = normalTaggedOps[tagObj].operations;

					let i = operations.length;

					while (i--) {
						const operation = operations[i].operation;
						const tmpDescription = operation.description || "";
						const tmpSummary = operation.summary || "";

						if (
							operations[i].path.toLowerCase().indexOf(phrase) === -1
							&& tmpDescription.toLowerCase().indexOf(phrase) === -1
							&& tmpSummary.toLowerCase().indexOf(phrase) === -1
						) {
							operations.splice(i, 1);
						}
					}

					if (operations.length == 0) {
						delete normalTaggedOps[tagObj];
					} else {
						normalTaggedOps[tagObj].operations = operations;
					}
				}

				return system.Im.fromJS(normalTaggedOps).sort();
			},
		},
	};
};

module.exports = {
	advancedFilterPlugin
}
