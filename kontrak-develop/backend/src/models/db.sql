CREATE TABLE jobPost (
	job_id serial primary key,
	user_id int,
	description text,
	category text,
	subcategory text,
	jobImg text,
	job_date date,
	FOREIGN KEY (user_id)
      REFERENCES users(user_id)

);  

 select users.firstname, contractor.images,contractor.calloutfee, category.category_name,sub_category.sub_catname
            from contractor
            INNER JOIN users on users.user_id=contractor.user_id
            INNER JOIN category on  category.contractor_id=contractor.contractor_id
			INNER JOIN sub_category on sub_category.category_id=category.category_id
            where sub_catname LIKE $1;






CREATE TABLE lookupcategory (
	category_id serial PRIMARY KEY,
	category VARCHAR ( 255 )
);

INSERT INTO lookupcategory(category )VALUES
('mason');


select * from lookupcategory;


CREATE TABLE lookupSubcategory (
	subcategory_id serial PRIMARY KEY,
	category_id  integer,
	subcategory1 VARCHAR ( 255 ),
	subcategory2 VARCHAR ( 255 ),
	subcategory3 VARCHAR ( 255 ),
	  FOREIGN KEY (category_id)
      REFERENCES lookupcategory (category_id)
);

INSERT INTO lookupSubcategory(category_id, subcategory1, subcategory2, subcategory3 )VALUES
(3,'foundation', 'walls', 'vestryu');

select * from lookupSubcategory;
SELECT * FROM lookupSubcategory WHERE category_id = 1;

Select DISTINCT review.firstname, review.rating, review.comment
from review, users
where contractor_id=12;

INSERT INTO review(rating, comment, contractor_id, user_id, firstname)
VALUES (4, 'Nyimelo is a good contractor',13,26,'brandon');
-- get contractors on request quote
            select users.firstname, contractor.location, contractor.images, review.rating, contractor.calloutfee, category.category_name, sub_category.sub_catname
      from contractor
      INNER JOIN users on users.user_id=contractor.user_id
      INNER JOIN category on  category.contractor_id=contractor.contractor_id
      INNER JOIN  sub_category on sub_category.category_id=category.category_id
 INNER JOIN review on review.contractor_id =contractor.contractor_id
      where  location = $1  AND category_name = $2 AND sub_catname =$3;
