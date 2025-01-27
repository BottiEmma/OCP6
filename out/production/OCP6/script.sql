CREATE TABLE IF NOT EXISTS `USERS` (
                         `id` integer PRIMARY KEY AUTO_INCREMENT,
                         `email` varchar(255),
                         `username` varchar(255),
                         `password` varchar(255)
);

CREATE TABLE IF NOT EXISTS `SUBJECTS` (
                         `id` integer PRIMARY KEY AUTO_INCREMENT,
                         `title` varchar(255),
                         `description` varchar(255)
);

CREATE TABLE IF NOT EXISTS `SUBSCRIPTIONS` (
                           `user_id` integer,
                           `subject_id` integer,
                            FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`),
                            FOREIGN KEY (`subject_id`) REFERENCES `SUBJECTS` (`id`)
);

CREATE TABLE IF NOT EXISTS `POSTS` (
                            `id` integer PRIMARY KEY AUTO_INCREMENT,
                            `author_id` integer,
                            `subject_id` integer,
                            `title` varchar(255),
                            `content` varchar(255),
                            `date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                            FOREIGN KEY (`author_id`) REFERENCES `USERS` (`id`),
                            FOREIGN KEY (`subject_id`) REFERENCES `SUBJECTS` (`id`)
);

CREATE TABLE IF NOT EXISTS `COMMENTS` (
                             `id` integer PRIMARY KEY AUTO_INCREMENT,
                             `user_id` integer,
                             `post_id` integer,
                             `content` varchar(255),
                             FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`),
                             FOREIGN KEY (`post_id`) REFERENCES `POSTS` (`id`)
);

INSERT INTO USERS (email, username, password)
VALUES ('user1@mail.com', 'user1', '$2a$10$.Hsa/ZjUVaHqi0tp9xieMeewrnZxrZ5pQRzddUXE/WjDu2ZThe6Iq'),
       ('user2@mail.com', 'user2', '$2a$10$.Hsa/ZjUVaHqi0tp9xieMeewrnZxrZ5pQRzddUXE/WjDu2ZThe6Iq');

INSERT INTO SUBJECTS (title, description)
VALUES ('Premier thème', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
       ('Deuxième thème', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
       ('Troisième thème', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
       ('Quatrième thème', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
       ('Cinquième thème', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');

INSERT INTO SUBSCRIPTIONS (user_id, subject_id)
VALUES (1, 3),
       (2, 2),
       (2, 5);

INSERT INTO POSTS (author_id, subject_id, title, content, date)
VALUES (1, 3, 'Premier article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', current_time),
       (2, 3, 'Deuxième article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', current_time),
       (2, 5, 'Troisième article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', current_time),
       (2, 3, 'Quatrième article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', current_time),
       (2, 2, 'Cinquième article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', current_time),
       (1, 1, 'Sixième article', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', current_time);

INSERT INTO COMMENTS (user_id, post_id, content)
VALUES (1, 2, 'je ne suis pas d\'accord'),
       (2, 1, 'Il faudrait élaborer...');

