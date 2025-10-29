-- USERS TABLE
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT, -- only if not using Firebase Auth
    profile_image_url TEXT,
    plan VARCHAR(20) DEFAULT 'free',
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- LECTURES TABLE
CREATE TABLE lectures (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    audio_file_url TEXT,
    transcript_text TEXT,
    summary TEXT,
    status VARCHAR(20) DEFAULT 'processing', -- processing, completed, error
    duration_seconds INT,
    model_used VARCHAR(50),
    created_at TIMESTAMP DEFAULT NOW()
);

-- FLASHCARDS TABLE
CREATE TABLE flashcards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lecture_id UUID REFERENCES lectures(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- QUIZZES TABLE
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lecture_id UUID REFERENCES lectures(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    option_a TEXT NOT NULL,
    option_b TEXT NOT NULL,
    option_c TEXT NOT NULL,
    option_d TEXT NOT NULL,
    correct_answer CHAR(1) CHECK (correct_answer IN ('A','B','C','D')),
    created_at TIMESTAMP DEFAULT NOW()
);

-- STUDY SETS TABLE
CREATE TABLE study_sets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lecture_id UUID REFERENCES lectures(id) ON DELETE CASCADE,
    title VARCHAR(255),
    summary TEXT,
    flashcards_count INT DEFAULT 0,
    quiz_count INT DEFAULT 0,
    exported BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- CHAT HISTORY TABLE
CREATE TABLE chat_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lecture_id UUID REFERENCES lectures(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- CHAT MESSAGES TABLE (for multi-message conversations)
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    chat_id UUID REFERENCES chat_history(id) ON DELETE CASCADE,
    role VARCHAR(10) CHECK (role IN ('user', 'assistant')),
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- INDEXES for fast querying
CREATE INDEX idx_lectures_user_id ON lectures(user_id);
CREATE INDEX idx_flashcards_lecture_id ON flashcards(lecture_id);
CREATE INDEX idx_quizzes_lecture_id ON quizzes(lecture_id);
CREATE INDEX idx_study_sets_user_id ON study_sets(user_id);
CREATE INDEX idx_chat_history_user_id ON chat_history(user_id);
