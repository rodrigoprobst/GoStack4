import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  margin: 0 10px 20px 10px;
  .buttonsHolder {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    & button {
      border-radius: 0 0 3px 0;
      border: none;
      background: #ff5555;
      padding: 10px;
      & i {
        color: white;
      }
      & + button {
        border-radius: 0 0 0 3px;
        background: #55ff55;
      }
    }
  }
  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 64px;
    }
    strong {
      margin-top: 10px;
      font-size: 24px;
    }
    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;
    li {
      font-weight: bold;
      padding: 12px 20px;
      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }
      &:nth-child(2n-1) {
        background: #f5f5f5;
      }
    }
  }
`;
