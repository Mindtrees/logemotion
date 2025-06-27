import { Box, Container } from "@mui/material";
import PostHeader from "../../components/PostHeader";
import SearchBar from "../../components/SearchBar";
import PostList from "../../components/PostList";
import { useGetAllPosts } from "../../hooks/UsePost";
import MuiPagination from "../../components/Pagination";
import { useEffect, useState } from "react";
import { useAuthState } from "../../hooks/UseLogin";

const POSTS_PER_PAGE = 4;

const AllPosts = () => {
  const { user } = useAuthState();
  const { allPosts, isLoading, error } = useGetAllPosts();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 검색 필터
  const filteredPosts = allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 페이지네이션 로직
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(
    startIndex,
    startIndex + POSTS_PER_PAGE
  );

  // 검색어 바뀌면 페이지 1로 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // 페이지 바뀌면 스크롤 맨 위로
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <div>
      <Box
        sx={{
          backgroundColor: "background.section",
          minHeight: "100vh",
          width: "100vw",
          paddingBottom: "100px",
          pt:8,
          pb:14
        }}
      >
        <Container
          maxWidth={false}
          sx={{
            maxWidth: "940px",
            backgroundColor: "background.section",
            pt: 2,
          }}
        >
          <PostHeader title={"All Posts"} />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          {/* <PostList posts={allPosts} isLoading={isLoading} error={error} /> */}
          <PostList
            posts={currentPosts}
            isLoading={isLoading}
            error={error}
            currentUserId={user?.uid}
          />
          <MuiPagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </Container>
      </Box>
    </div>
  );
};

export default AllPosts;
