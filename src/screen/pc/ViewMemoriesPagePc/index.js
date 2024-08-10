import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; 

function ViewMemoriesPagePc() {
  const navigate = useNavigate();

  // 상태 설정  
  const [isListVisible, setIsListVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [bookmark, setBookmark] = useState([]); // 즐겨찾기 버튼

  // 버튼 리스트 항목
  const buttons = ['최신순', '이름순', '검색어 관련순', '즐겨찾기순'];  

  const [titles, setTitle] = useState([
    '편집 디자인 발표',
    '디자인 원리',
    'UI/UX 발표',
    '그래픽 디자인',
    '브랜드 디자인',
    '제품 디자인 발표',
    '자료구조 발표',
    '프로젝트 발표1'
  ]);
  const [contents, setContent] = useState([
    '안녕하세요, 편집디자인 설계 기말과제를 발표할 19학번 이민우라고 합니다. \n 오늘 저는 이번 학기 동안 진행한 편집디자인 설계 프로젝트에 대해 말씀드리고자 합니다. 이 프로젝트는 저에게 창의성과 기술적 역량을 발휘할 수 있는 소중한 기회가 되었습니다. 먼저, 프로젝트의 주제를 설명드리겠습니다. ',
    '안녕하세요, 디자인 원리를 발표할 19학번 김철수입니다. 오늘 저는 디자인 원리의 중요성과 이를 실제 작업에 어떻게 적용할 수 있는지에 대해 말씀드리고자 합니다. ',
    '안녕하세요, UI/UX를 발표할 19학번 박영희입니다. ',
    '안녕하세요, 그래픽 디자인을 발표할 19학번 이준호입니다. 오늘 저는 그래픽 디자인의 기본 원리와 이 원리들이 실제 프로젝트에 어떻게 적용될 수 있는지에 대해 말씀드리고자 합니다. 그래픽 디자인은 시각적 커뮤니케이션의 핵심 도구로서, ',
    '안녕하세요, 브랜드 디자인을 발표할 19학번 최지우입니다.',
    '안녕하세요, 제품 디자인을 발표할 19학번 이수빈입니다. 오늘 저는 제품 디자인의 과정과 그 중요성에 대해 말씀드리겠습니다. 제품 디자인은 단순히 물건을 아름답게 만드는 것을 넘어서, 사용자의 경험을 향상시키고, 제품의 기능성을 극대화하는 데 중점을 둡니다.',
    '안녕하세요, 저는 자료구조 발표를 맡은 21학번 000입니다. 오늘',
    '안녕하세요, 저는 프로젝트 발표를 맡은 21학번 000입니다.'
  ]);
  const [dates, setDate] = useState([
    '2024.04.15',
    '2024.04.16',
    '2024.04.17',
    '2024.04.18',
    '2024.04.19',
    '2024.04.20',
    '2024.08.10',
    '2024.08.11'
  ]);

  // 버튼 리스트 토글 함수
  const toggleList = () => {
    setIsListVisible(prevState => !prevState);
  };  
  
  const handleButtonClick = (index) => {
    setSelectedButton(index);

    // 정렬 로직
    const combined = titles.map((title, i) => ({
        title,
        content: contents[i],
        date: dates[i],
        isBookmarked: bookmark.includes(i)
    }));

    // 즐겨찾기순 정렬 처리
    if (index === 3) {
        combined.sort((a, b) => {
            if (a.isBookmarked && !b.isBookmarked) return -1; // a가 즐겨찾기, b가 아닌 경우
            if (!a.isBookmarked && b.isBookmarked) return 1; // b가 즐겨찾기, a가 아닌 경우
            return new Date(b.date) - new Date(a.date); // 즐겨찾기가 아닌 경우 최신순 정렬
        });
    } else {
        // 일반 정렬 처리
        if (index === 0) {
            // 최신순
            combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (index === 1) {
            // 이름순
            combined.sort((a, b) => a.title.localeCompare(b.title));
        } else if (index === 2) {
            // 검색어 관련순
            combined.sort((a, b) => new Date(b.date) - new Date(a.date)); // 현재 로직이 동일하므로 최신순 사용
        }
    }

    // 정렬된 데이터로 상태 업데이트
    setTitle(combined.map(item => item.title));
    setContent(combined.map(item => item.content));
    setDate(combined.map(item => item.date));
    
    // 즐겨찾기 상태 업데이트
    const newBookmarks = combined
      .filter(item => item.isBookmarked)
      .map((_, i) => i); // 즐겨찾기 인덱스 업데이트
    setBookmark(newBookmarks);
};

  const handleBack = () => {
    navigate('/');
  };

  const toggleBookmark = (index) => { // 즐겨찾기
    setBookmark((prevBookmarks) => {
      if (prevBookmarks.includes(index)) {
        return prevBookmarks.filter((i) => i !== index);
      } else {
        return [...prevBookmarks, index];
      }
    });
  };
  return(
    
  <div className='ViewMemoriesPage-vi'>
    <div className='Header-vi'>
      <button className='backbutton-vi' onClick={handleBack}>
        <svg width="110" height="85" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_2522_187)">
        <path d="M4.51794 34.0155L4.2501 30.2917C4.19134 29.4847 4.77541 29.1063 5.43377 29.0596C6.09214 29.013 6.72459 29.3154 6.78161 30.1103L7.04945 33.8341L11.5042 33.5144C12.2611 33.4609 12.5825 33.9482 12.6188 34.4441C12.6551 34.94 12.3924 35.4705 11.6477 35.5241L2.11602 36.2084C1.37125 36.2619 1.03774 35.7867 1.00146 35.2787C0.965167 34.7707 1.214 34.2523 1.97086 34.1987L4.51448 34.0155H4.51794ZM9.25093 28.282L9.32523 27.5528C9.34251 27.3904 9.25093 27.2522 9.06603 27.2349L2.78475 26.5955C2.0901 26.5247 1.82053 25.9717 1.86718 25.4965C1.91384 25.0213 2.28018 24.5323 2.9852 24.6049L10.0544 25.3237C11.4196 25.4619 11.7824 26.0253 11.6684 27.1588L11.5302 28.524C11.3401 30.3867 10.9703 31.7277 10.4415 32.5623C10.0665 33.1429 9.27685 33.3313 8.67896 33.0029C8.19166 32.7316 8.10008 32.1372 8.3852 31.6292C8.81374 30.8654 9.09368 29.8303 9.25093 28.2803V28.282Z" fill="url(#paint0_linear_2522_187)"/>
        <path d="M15.6894 33.3192C15.7067 33.7408 15.8311 33.8203 16.2528 33.803L18.1691 33.7235C18.8811 33.6941 19.1645 34.1659 19.1852 34.648C19.2059 35.1301 18.9502 35.6727 18.2503 35.7004L15.3577 35.8196C13.8509 35.8818 13.4724 35.474 13.4137 34.0397L13.3065 31.4357C13.2478 30.0014 13.5934 29.5884 15.0985 29.5262L16.1837 29.4813L16.1111 27.7101C16.1024 27.4924 15.9884 27.3766 15.7724 27.3852L14.1809 27.4509C13.4569 27.4803 13.1355 26.9981 13.1147 26.5057C13.094 26.0132 13.3636 25.4931 14.098 25.4637L16.3997 25.3686C18.0637 25.2995 18.3091 25.7125 18.3592 26.9411L18.5406 31.3527L16.1543 31.4512C15.7326 31.4685 15.6151 31.5583 15.6324 31.98L15.6877 33.3174L15.6894 33.3192ZM22.5133 31.5065L21.8999 31.4789L21.6683 36.5419L19.536 36.4434L20.0164 25.9752C20.0475 25.2892 20.5659 24.9557 21.1309 24.9816C21.696 25.0075 22.1798 25.398 22.1504 26.0719L21.9949 29.4675L22.6084 29.4951L22.7639 26.0996C22.795 25.4136 23.3393 25.0818 23.9026 25.1077C24.466 25.1336 24.9774 25.5259 24.9463 26.1998L24.466 36.668L22.2835 36.5678L22.515 31.5048L22.5133 31.5065Z" fill="url(#paint1_linear_2522_187)"/>
        <path d="M28.8827 34.0155L28.6149 30.2917C28.5561 29.4847 29.1402 29.1063 29.7986 29.0596C30.4569 29.013 31.0894 29.3154 31.1464 30.1103L31.4143 33.8341L35.869 33.5144C36.6259 33.4608 36.9473 33.9481 36.9836 34.4441C37.0199 34.94 36.7572 35.4705 36.0125 35.5241L26.4808 36.2084C25.736 36.2619 25.4025 35.7867 25.3663 35.2787C25.33 34.7707 25.5788 34.2523 26.3357 34.1987L28.8793 34.0155H28.8827ZM33.6157 28.282L33.69 27.5528C33.7073 27.3904 33.6157 27.2521 33.4308 27.2349L27.1496 26.5955C26.4549 26.5247 26.1853 25.9717 26.232 25.4965C26.2786 25.0213 26.645 24.534 27.3517 24.6048L34.421 25.3237C35.7861 25.4619 36.149 26.0253 36.0349 27.1588L35.8967 28.524C35.7066 30.3867 35.3368 31.7277 34.808 32.5623C34.4331 33.1429 33.6434 33.3313 33.0455 33.0029C32.5582 32.7316 32.4666 32.1372 32.7517 31.6292C33.1803 30.8654 33.4602 29.8303 33.6175 28.2803L33.6157 28.282Z" fill="url(#paint2_linear_2522_187)"/>
        <path d="M40.0542 33.3192C40.0715 33.7408 40.1959 33.8203 40.6176 33.803L42.5339 33.7235C43.2459 33.6941 43.5293 34.1659 43.55 34.648C43.5707 35.1301 43.315 35.6727 42.6151 35.7004L39.7225 35.8196C38.2156 35.8818 37.8372 35.474 37.7785 34.0397L37.6713 31.4357C37.6126 30.0014 37.9582 29.5884 39.4633 29.5262L40.5485 29.4813L40.4759 27.7101C40.4672 27.4924 40.3532 27.3766 40.1372 27.3852L38.5457 27.4509C37.8217 27.4803 37.5003 26.9981 37.4795 26.5057C37.4588 26.0132 37.7284 25.4931 38.4628 25.4637L40.7645 25.3686C42.4285 25.2995 42.6739 25.7125 42.724 26.9411L42.9054 31.3527L40.5191 31.4512C40.0974 31.4685 39.9799 31.5583 39.9972 31.98L40.0525 33.3174L40.0542 33.3192ZM46.8781 31.5065L46.2647 31.4789L46.0331 36.5419L43.9008 36.4434L44.3812 25.9752C44.4123 25.2892 44.9307 24.9557 45.4957 24.9816C46.0608 25.0075 46.5446 25.398 46.5152 26.0719L46.3597 29.4675L46.9732 29.4951L47.1287 26.0996C47.1598 25.4136 47.7041 25.0818 48.2674 25.1077C48.8308 25.1336 49.3422 25.5259 49.3111 26.1998L48.8308 36.668L46.6483 36.5678L46.8798 31.5048L46.8781 31.5065Z" fill="url(#paint3_linear_2522_187)"/>
        </g>
        <path d="M9.09349 20.7277C9.18674 20.0662 8.92025 19.4653 8.49827 19.3856C8.07628 19.3059 7.65859 19.7775 7.56534 20.439C7.47208 21.1005 7.73857 21.7014 8.16056 21.7811C8.58255 21.8609 9.00024 21.3892 9.09349 20.7277Z" fill="#3A9BD9"/>
        <path d="M4.45898 21.1994C5.8456 12.9764 13.6901 9.77275 20.1449 10.1053C23.7598 10.2905 27.6572 11.5022 30.2363 14.6106C32.317 17.1167 33.7844 21.5266 37.2734 21.6579C39.028 21.7244 40.2951 20.5289 41.1103 18.83C42.4053 16.1315 44.3354 14.2978 47.0915 14.2222" stroke="url(#paint4_linear_2522_187)" stroke-width="1.9008" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M44.5254 20.3983C45.7847 18.4441 47.4896 17.3385 49.7318 17.2773" stroke="url(#paint5_linear_2522_187)" stroke-width="1.9008" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M25.2546 7.65529L25.5933 5.35014C25.6693 4.83001 25.3099 4.3479 24.7915 4.27187C24.2713 4.19584 23.7892 4.55526 23.7132 5.07366L23.6406 5.57132" stroke="#ACE1FF" stroke-width="1.3824" stroke-miterlimit="10" stroke-linecap="round"/>
        <path d="M25.4316 6.45732L25.8204 3.81003C25.8965 3.2899 26.3803 2.9322 26.8987 3.00823C27.4188 3.08427 27.7765 3.56811 27.7005 4.08651L27.6279 4.58417" stroke="#ACE1FF" stroke-width="1.3824" stroke-miterlimit="10" stroke-linecap="round"/>
        <defs>
        <linearGradient id="paint0_linear_2522_187" x1="19.1228" y1="27.0131" x2="30.7837" y2="39.853" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2D9AE0"/>
        <stop offset="1" stop-color="#2F75DE"/>
        </linearGradient>
        <linearGradient id="paint1_linear_2522_187" x1="19.1228" y1="27.0131" x2="30.7837" y2="39.853" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2D9AE0"/>
        <stop offset="1" stop-color="#2F75DE"/>
        </linearGradient>
        <linearGradient id="paint2_linear_2522_187" x1="19.1228" y1="27.0131" x2="30.7837" y2="39.853" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2D9AE0"/>
        <stop offset="1" stop-color="#2F75DE"/>
        </linearGradient>
        <linearGradient id="paint3_linear_2522_187" x1="19.1228" y1="27.0131" x2="30.7837" y2="39.853" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2D9AE0"/>
        <stop offset="1" stop-color="#2F75DE"/>
        </linearGradient>
        <linearGradient id="paint4_linear_2522_187" x1="20.4522" y1="12.399" x2="31.6889" y2="23.7806" gradientUnits="userSpaceOnUse">
        <stop stop-color="#2D9AE0"/>
        <stop offset="1" stop-color="#2F75DE"/>
        </linearGradient>
        <linearGradient id="paint5_linear_2522_187" x1="46.4785" y1="17.9019" x2="48.775" y2="18.9558" gradientUnits="userSpaceOnUse">
        <stop offset="1" stop-color="#2F75DE"/>
        </linearGradient>
        <clipPath id="clip0_2522_187">
        <rect width="48.3097" height="12.0701" fill="white" transform="translate(1.00195 24.5977)"/>
        </clipPath>
        </defs>
        </svg>

      </button> 
      <div className='login-div-vi'>
        <div className='login-logo-vi'>
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_2522_200)">
          <rect width="30" height="30" rx="12" fill="#F1F4F5"/>
          <circle cx="15" cy="10" r="4" fill="#2F75DE"/>
          <circle cx="15" cy="26" r="10" fill="#2F75DE"/>
          </g>
          <defs>
          <clipPath id="clip0_2522_200">
          <rect width="30" height="30" rx="12" fill="white"/>
          </clipPath>
          </defs>
          </svg>
        </div>
        <button className='login-button-vi'>로그인하기
        </button>
      </div>
    </div>


    <div className='main-vi'> 
      <div className='main-div-vi'>
        <div className='search-vi'>
          <div className='search-div-vi'>
            <input type='text' className='search-input-vi' placeholder='검색어를 입력하세요.'/>
            <button className='search-button-vi'>
              <svg  width="30" height="30" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.73043 10.1374C8.85669 10.8847 7.72225 11.3359 6.48242 11.3359C3.721 11.3359 1.48242 9.09736 1.48242 6.33594C1.48242 3.57451 3.721 1.33594 6.48242 1.33594C9.24385 1.33594 11.4824 3.57451 11.4824 6.33594C11.4824 7.71252 10.9261 8.95917 10.0261 9.86334C9.9566 9.8873 9.89136 9.927 9.8359 9.98246C9.78991 10.0284 9.75476 10.0812 9.73043 10.1374ZM10.1956 11.0493C9.17414 11.8551 7.88444 12.3359 6.48242 12.3359C3.16871 12.3359 0.482422 9.64965 0.482422 6.33594C0.482422 3.02223 3.16871 0.335938 6.48242 0.335938C9.79613 0.335938 12.4824 3.02223 12.4824 6.33594C12.4824 7.88745 11.8935 9.30142 10.9271 10.3665L13.3714 12.8109C13.5667 13.0061 13.5667 13.3227 13.3714 13.518C13.1762 13.7133 12.8596 13.7133 12.6643 13.518L10.1956 11.0493Z" fill="#8C8C8C"/>
              </svg>
            </button>
          </div>
        </div>
        <div className='list-button-vi'>
                <button className='sort-button-vi' onClick={toggleList}>
                  <div className='sort-icon-vi'>
                    <div className='line1-vi'></div>
                    <div className='line2-vi'></div>
                    <div className='line3-vi'></div>
                  </div>
                </button>
                <span className='sort-label-vi'>정렬순</span>
            
                {isListVisible && (
                  <div className='button-list-vi'>
                    {buttons.map((buttonLabel, index) => (
                      <button
                        key={index}
                        className={`button-item-vi ${selectedButton === index ? 'selected' : ''}`}
                        onClick={() => handleButtonClick(index)}
                      >
                        {buttonLabel}
                        <span className='check-icon-vi'>
                          <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 3.33333L5.8 8L13 1" stroke="#3A9BD9"/>
                          </svg>
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
      
        <div className='content-div-vi'>
        {titles.map((title, index) => (
            <div key={index} className='content-vi'>
              <div className="title-vi">{title}
                <div className="Bookmark-vi" onClick={() => toggleBookmark(index)}>
                  {bookmark.includes(index) ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="#FFD700"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" stroke="#D9D9D9" fill="none"/>
                    </svg>
                  )}
                </div>
              </div>
              <div className="content-text-vi">{contents[index]}</div>
              <div className="date-vi">{dates[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>

  );
}

export default ViewMemoriesPagePc;