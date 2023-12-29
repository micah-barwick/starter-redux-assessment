import { useState } from 'react';
import { addPhoto } from '../photos.slice';
import { useDispatch } from 'react-redux';
import './create.css';

export default function CreatePhoto() {
  const [formData, setFormData] = useState({ imageUrl: '', caption: '' });
  const dispatch = useDispatch();

  function handleChange({ target: { name, value } }) {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(addPhoto({imageUrl: formData.imageUrl, caption: formData.caption}));
    setFormData({ imageUrl: '', caption: '' });
  }

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <h2>Add a dog</h2>
      <div>
        <label htmlFor="url">Enter your image's url: </label>
        <input
          id="url"
          name="imageUrl"
          onChange={handleChange}
          placeholder="e.g., https://images.dog.ceo/breeds/australian-shepherd/pepper.jpg"
          type="text"
          value={formData.imageUrl}
        />
      </div>
      <div>
        <label htmlFor="caption">Enter your image's caption: </label>
        <input
          id="caption"
          name="caption"
          onChange={handleChange}
          placeholder="e.g., Australian Shepherd"
          type="text"
          value={formData.caption}
        />
      </div>
      <input type="submit" />
    </form>
  );
}
