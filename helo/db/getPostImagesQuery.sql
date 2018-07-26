SELECT i.image_url, u.username, p.title, p.content FROM posts p
    JOIN helo_images i ON i.post_id = p.id
    JOIN helo_users u ON u.id = p.author_id
    WHERE p.id = $1;