import { uniqBy, sortBy} from "lodash";

export const initialFeedState = {
  isLoading: true,
  tweetsFeed: [],
  allTw:[],
  hasMore: true,
  isLoadingSpinner:false,
  toastMessage: null,
  hideFeed: false,
};

const cleanRetweets = (data) => {

  const virgenArray = data;

  const rtnull = virgenArray.filter((item) => item.Retweet === null && item.LikesId === null);
  const rtnotNull = virgenArray.filter((item) => item.Retweet !== null);
  const lknotNull = virgenArray.filter((item) => item.LikesId !== null);
  const cleanRt = uniqBy(rtnotNull, "Retweet");
 
  const cleanLk = uniqBy(lknotNull, "LikesId");


const cleanRtLk = cleanRt.concat(cleanLk)

  const combineTw = rtnull.concat(uniqBy(sortBy(cleanRtLk, ["idtwetts"]).reverse(), 'text') );
  const twready = sortBy(combineTw, ["idtwetts"]).reverse();
  twready.map( item =>{
    item.Retweet_state = false
    item.Like_state = false
  } )

  return twready;
};

export const feedReducer = (previousState, action) => {
  switch (action.type) {
    case "LOAD_FEED":
     
      const twToprint = cleanRetweets(action.payload.data.tweets);

      return {
        ...previousState,
        tweetsFeed: twToprint,
        isLoading: false,
        hideFeed:false,
        allTw:  action.payload.data.allTw !== undefined ? action.payload.data.allTw : (previousState.allTw)
      };

    case "LOAD_MORE":

      const twMore = cleanRetweets(action.payload.data.tweets);

      const readytwMore = sortBy(previousState.tweetsFeed.concat(twMore), [
        "idtwetts",
      ]).reverse();

      return {
        ...previousState,
        tweetsFeed: readytwMore,
        isLoadingSpinner:false
      };

    case "LOAD_LAST":
     

      const twLast = cleanRetweets(action.payload.data.tweets);

      const readytwlast = sortBy(previousState.tweetsFeed.concat(twLast), [
        "idtwetts",
      ]).reverse();

      return {
        ...previousState,
        tweetsFeed: readytwlast,
        isLoadingSpinner:false,
        hasMore: false,
      };

      case "SET_LOADING":
        return {
          ...previousState,
          isLoadingSpinner:true
        };

        case "SET_LOADING_SKELETONS":
          return {
            ...previousState,
            isLoading:true,
            hasMore:true
          };

          case "HIDE_FEED":
            return {
              ...previousState,
              hideFeed:true,
              isLoading:false,
              hasMore:true
            };
        

      case "NEW_TWEETT":
     
      
        const newTw = action.payload.data.tweets[0];
  
        return {
          ...previousState,
          tweetsFeed: [newTw , ...previousState.tweetsFeed],
          isLoadingSpinner:false,
          toastMessage: action.message,
          allTw:[newTw , ...previousState.allTw]
        };
        case "NEW_COMMENT":
     
          const newCm = action.payload.data.tweets[0];
    
          return {
            ...previousState,
            tweetsFeed: [newCm , ...previousState.tweetsFeed],
            isLoadingSpinner:false,
            toastMessage: action.message,
            allTw:[newCm , ...previousState.allTw],
            hideFeed:false
          
          };
    case "RETWEET":
      const twState = action.payload.retweet_state;
     
      const tw = previousState.tweetsFeed.find( tw => action.payload.idtwetts === tw.idtwetts )
      const indexTw = previousState.tweetsFeed.findIndex( tw => action.payload.idtwetts === tw.idtwetts )
      tw.Retweet_state = twState === true ? false : true
      tw.Retweet_count = tw.Retweet_count + (twState ? -1 : 1)
   
      const rtwUpdated = previousState.tweetsFeed.splice((indexTw, 1, tw))
    
      return {
        ...previousState,
        tweetsFeed: rtwUpdated
      };
    case "LIKE":
      const lkState = action.payload.like_state;
     
      const lkTw = previousState.tweetsFeed.find( tw => action.payload.idtwetts === tw.idtwetts )
      const indexLkTw = previousState.tweetsFeed.findIndex( tw => action.payload.idtwetts === tw.idtwetts )
      lkTw.Like_state = lkState === true ? false : true
      lkTw.Like_count = lkTw.Like_count + (lkState ? -1 : 1)
 
      const lkTwUpdated = previousState.tweetsFeed.splice((indexLkTw, 1, lkTw))
     
      return {
        ...previousState,
        tweetsFeed: lkTwUpdated,

      };
    case "COMMENT":
      return {
        ...previousState,
        isLoading: false,
        id: null,
        Username: null,
        userImg: null,
      };
    case "DELETE":

    //PASAR DATOS PARA EL TOAST 

      const indexToDelete = previousState.tweetsFeed.findIndex( tw => action.payload.idtwetts === tw.idtwetts )
      const feedUpdated = previousState.tweetsFeed.splice((indexToDelete, 1))
      return {
        ...previousState,
        tweetsFeed: feedUpdated,
        isLoadingSpinner:false,
        toastMessage: action.payload.deletedCheck.message
      };
    default:
      return previousState;
  }
};
