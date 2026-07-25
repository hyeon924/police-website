export const navItems = [
  { label: '경찰민원', children: ['민원안내', '온라인 민원'] },
  { label: '정보공개', children: ['정보공개청구', '사전정보공표', '공공데이터개방'] },
  { label: '시민마당', children: ['자유게시판', '수사관 교체 요청', '모범경찰 추천'] },
  { label: '알림마당', children: ['공지사항', '채용정보', '입찰공고'] },
  { label: '대전경찰소개', children: ['대전경찰 역사관', '조직안내', '찾아오시는 길'] },
]

export const notices = [
  ['2025. 01. 15', '대전경찰청 홈페이지 이용 안내'],
  ['2025. 01. 10', '2025년 대전경찰청 주요 추진계획'],
  ['2025. 01. 03', '설 명절 특별 교통관리 안내'],
]

export const gallery = Array.from({ length: 13 }, (_, index) => ({
  id: index + 1,
  year: 2018,
  title: `대전경찰 주요 활동 ${index + 1}`,
  image: `h${index + 1}.jpg`,
}))
