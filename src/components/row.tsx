
import styled, {  } from 'styled-components';
import { FinderItem } from 'components/table';

interface RowProps {
    item: FinderItem;
}

const RowBlock = styled.div`
    width: 100%;
    height: 150px;
    user-select: none;
    /* margin-bottom: 2rem; */

    border-radius: 10px;

    display: flex;
    &:nth-child(2n+2) { background-color: #292727; }

    /* 모바일에선 hover효과 적용 안됨 */
    @media (hover: hover) {
	    &:hover { background-color: #323b89; 
    }
}
`

const ImageContainer = styled.div`
    padding: 0.8rem;
    width: 10rem;
    height: 100%;
    
`;
const DetailContainer = styled.div`
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;
const Detail = styled.div`
    padding: 0.8rem;
    
    p {margin: 0; }
    .title {
        font-size: 1rem;
        font-weight: bold;
        color: #d1d1d1;
    }
    .body {
        font-size: 0.9rem;
        padding-left: 0.6rem;
    }
`;

const title = ['프로젝트 이름', '마지막 수정일', '기술 스택']
const Row = ({
    item,
}: RowProps) => {

    const handleClick = () => {
    }
    return (
        <RowBlock onClick={handleClick}>
            <DetailContainer>
                <Detail>
                    <p className='title'>{title[0]}</p>
                    <p className='body'>{item.text}</p>
                </Detail>    
                <Detail>
                    <p className='title'>{title[2]}</p>
                    <p className='body'>{item.stck}</p>
                </Detail>    
                
            </DetailContainer>
        </RowBlock>
    );
}

export default Row;