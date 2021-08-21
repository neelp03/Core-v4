import React, {useState, useEffect} from 'react';
import { Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from
  'reactstrap';
import {addTag, deleteTag, getUserTag} from '../../../APIFunctions/User.js';
import {getAllTags} from '../../../APIFunctions/Tag';
import Select from 'react-select';

export default function TagSection(props){
  const [dropdownOpen, setDropdownOpen] = useState(false);
  // all the available tags from web
  const [tags, setTags] = useState([]);
  // user tags
  const [userTags, setUserTags] = useState([]);
  // the tag user is selecting
  const [currentTag, setCurrentTag] = useState({role:'Choose tag'});
  // to know whether to add or delete tag
  const [add, setAdd] = useState(false);
  // to use React select
  const [options, setOptions] = useState([]);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  /*
        Cannot call async function directly in useEffect
        For more, visit:
        https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
    */
  useEffect(() => {
    (async () => {
      const tagsData = await getAllTags();
      const userTags = await getUserTag(props.email);
      let newOptions = [];

      for(let i =0; i < tagsData.responseData.length; i++){
        let loopingTag = tagsData.responseData[i];
        newOptions.push({value: loopingTag, label: loopingTag.role});
      }
      setTags(tagsData.responseData);
      setUserTags(props.tags);
      setOptions(newOptions);
      console.log(newOptions);
    })();
  }, []);

  useEffect(() =>{
    /*
            loop through user's tags to see if they already has the current tag
            if not, set add to true, otherwise false
        */
    let result = props.tags.filter(tag => tag.role === currentTag.role)
    if(result.length==0) {
      setAdd(true);
    } else {
      setAdd(false);
    }

  }, [currentTag.role]);

  async function handleTagOperation(){
    if(currentTag.role !== 'Choose tag' ){
      let apiResponse = null;
      alert('Before sending '+ props.email + ' '+ currentTag.role);
      if(add)
        apiResponse = await addTag(props.email, currentTag.role);
      else
        apiResponse = await deleteTag(props.email, currentTag.role);

      if(apiResponse.error){
        alert('Error adding/removing tag ' + apiResponse.responseData);
        console.log(apiResponse);
      } else {
        alert('Successfully add/remove tag');
        window.location.reload();
      }
    }
  }

  return(
    <div>
      {/* inline styling color for user's access level
                as Badge doesn't support custom color
                https://reactstrap.github.io/components/badge/#
            */}
      {
        userTags.map(tag => <Badge style={{backgroundColor: tag.color}}>{tag.role}</Badge>)
      }
      <Select options = {options} onChange = {(e) => setCurrentTag(e.value)}/>
      <button type="button" onClick={handleTagOperation} >{add ? 'Add tag':'Delete tag'}</button>
      <p>Side note: It's a good idea to refresh the page first to make sure tags operation took place</p>
    </div>
  );
}
