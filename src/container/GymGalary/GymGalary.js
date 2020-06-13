import React, { Component } from 'react';
import Pagination from '../../component/Pagination/Pagination';
import Layout from '../../hoc/Layout/Layout';
import requestWrapper from '../../utils/const/requestWrapper';
import SetOfElements from '../../component/SetOfElements/SetOfElements';
import BackDrop from '../../component/BackDrop/BackDrop';
import isEmpty from '../../utils/const/isEmpty';
import './GymGalary.scss';


class GymGalary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            itemsPerPage: 9,
            items: []
        }
    }

    paginate = pageNumber => this.setState({
        currentPage: pageNumber
    });

    componentDidMount = () => {
        requestWrapper('gymGalary').then(
            gymItem => {
                this.setState({
                    items: Object.values(gymItem[0])
                })
            } 
        );
    }

    render() {
        const { items } = this.state;
        const indexOfLastItems = this.state.currentPage * this.state.itemsPerPage;
        const indexOfFirstPost = indexOfLastItems - this.state.itemsPerPage;

        let currentPosts = [];
        if(items) {
            currentPosts = items.slice(indexOfFirstPost, indexOfLastItems);
        } 
        return (
            <Layout>
                {isEmpty(currentPosts) ?
                    <div className='gym-galary'>
                        <h1>Тренажерный зал</h1>
                        <SetOfElements 
                            arrayElements={currentPosts}
                        />
                        <Pagination 
                            postsPerPage={9}
                            totalPosts={items.length}
                            paginate={this.paginate}
                            href='/gym-galary'
                        />
                    </div>
                    :
                    <BackDrop 
                        open={isEmpty(currentPosts)}
                    />
                }
            </Layout>
        )
    }
}

export default GymGalary;