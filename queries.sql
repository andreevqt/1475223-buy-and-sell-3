-- Cписок всех категорий (идентификатор, наименование категории)
SELECT * FROM categories;

-- Cписок категорий для которых создано минимум одно объявление (идентификатор, наименование категории)
SELECT DISTINCT categories.id, categories.name 
FROM offers_categories
JOIN categories ON offers_categories.category_id = categories.id
JOIN offers ON offers_categories.offer_id = offers.id;

-- Cписок категорий с количеством объявлений (идентификатор, наименование категории, количество объявлений в категории)
SELECT categories.id, categories.name, COUNT(categories.id)
FROM offers_categories
JOIN categories ON offers_categories.category_id = categories.id
JOIN offers ON offers_categories.offer_id = offers.id
GROUP BY categories.id;

-- Cписок объявлений (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие объявления
SELECT data.id, data.title, data.description, data.categories, data.type, data.sum, data.created_at, COUNT(comments.offer_id) as comments_count, users.name, users.email FROM 
(
	SELECT offers.*, string_agg(categories.name, ', ') as categories
	FROM offers_categories
	JOIN categories ON offers_categories.category_id = categories.id
	JOIN offers ON offers_categories.offer_id = offers.id
	GROUP BY offers.id
) as data
JOIN comments ON comments.offer_id = data.id
JOIN users ON users.id = data.author_id
GROUP BY comments.offer_id, 
		 data.id,
		 data.title,
     data.description,
		 data.categories,
		 data.type,
		 data.sum,
		 data.created_at,
		 users.name,
		 users.email
ORDER BY data.created_at DESC;

-- Полная информация определённого объявления (идентификатор объявления, заголовок объявления, стоимость, тип объявления, текст объявления, дата публикации, имя и фамилия автора, контактный email, количество комментариев, наименование категорий)
SELECT data.id,
	data.title,
	data.description,
	data.type,
	data.picture,
	data.sum,
	data.created_at,
	data.categories,
	COUNT(comments.offer_id) as comments_count,
	users.name as author,
	users.email as author_email
	FROM (
		SELECT offers.*, string_agg(categories.name, ', ') as categories
		FROM offers_categories
		JOIN categories ON offers_categories.category_id = categories.id
		JOIN offers ON offers_categories.offer_id = offers.id
		GROUP BY offers.id
		ORDER BY offers.id
	) as data
JOIN users ON users.id = data.author_id
JOIN comments ON comments.offer_id = data.id
GROUP BY comments.offer_id,
		data.id,
		data.title,
		data.description,
		data.type,
		data.picture,
		data.sum,
		data.created_at,
		data.categories,
		users.name,
		users.email
HAVING data.id = 3;

-- Cписок из 5 свежих комментариев (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария);
SELECT comments.id, comments.text, comments.offer_id, comments.created_at, users.name, users.email 
FROM comments
JOIN users ON users.id = author_id
ORDER BY created_at DESC
LIMIT 5;

-- Cписок комментариев для определённого объявления (идентификатор комментария, идентификатор объявления, имя и фамилия автора, текст комментария). Сначала новые комментарии
SELECT comments.id, comments.text, comments.offer_id, comments.created_at, users.name, users.email 
FROM comments
JOIN users ON users.id = author_id
WHERE offer_id = 1
ORDER BY created_at DESC

-- Выбрать 2 объявления, соответствующих типу «куплю»
SELECT * FROM offers
WHERE type = 'buy'
LIMIT 2;

-- Обновить заголовок определённого объявления на «Уникальное предложение!»
UPDATE offers
SET title = 'Уникальное предложение!'
WHERE id = 1;
