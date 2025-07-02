CREATE TABLE IF NOT EXISTS applications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  srn VARCHAR(255),
  date_applied DATE,
  crew_type ENUM('new','ex','both'),
  photo_url VARCHAR(255),
  personal_info JSON,
  contact_info JSON,
  family_background JSON,
  education JSON,
  work_experience JSON,
  sea_experience JSON,
  status ENUM('draft','submitted','under_review','approved','rejected') DEFAULT 'draft',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
