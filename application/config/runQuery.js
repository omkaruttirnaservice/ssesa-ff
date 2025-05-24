/**
 * Executes a SQL query using the provided database connection pool.
 *
 * @param {Object} pool - The database connection pool (e.g., from `mysql` or `mysql2`).
 * @param {string} q - The SQL query string to be executed.
 * @param {Array} [data=[]] - Optional array of parameters to be used in the SQL query.
 *
 * @returns {Promise<Object>} - A promise that resolves with the query result or rejects with an error.
 *
 * @example
 * // Example usage with a query without parameters
 * runQuery(pool, 'SELECT * FROM users')
 *   .then(result => console.log(result))
 *   .catch(err => console.error(err));
 *
 * @example
 * // Example usage with a query with parameters
 * runQuery(pool, 'SELECT * FROM users WHERE id = ?', [1])
 *   .then(result => console.log(result))
 *   .catch(err => console.error(err));
 */
const runQuery = (pool, q, data = []) => {
	return new Promise((resolve, reject) => {
		if (data.length >= 1) {
			pool.query(q, data, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		} else {
			pool.query(q, function (err, result) {
				err ? reject(err) : resolve(result);
			});
		}
	});
};

module.exports = runQuery;
