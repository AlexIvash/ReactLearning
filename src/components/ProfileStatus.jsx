import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false
    }

    /**
     * Если бы этот метод имел бы вот такой синтаксис - тогда его не нужно было бы bind'ить
    activateEditMode = () => {
        alert('hey');
        this.state.editMode = true;
    }
*/

    activateEditMode() {
        this.setState({
            editMode: true
        })//специальный метод по апдейту state. Причем как локального, так видимо и любого другого.
        //  this.forceUpdate();этого метода лучше избегать, но этот метод говорить React перерисовать компоненту,
        //если state изменился. Потому что даже если state меняется - это не дает гарантии, что поменяется веб элемент
        //со span на input. Но если мы используем всстроенный в react setState метод - то этот метод уже и не нужен.
    }

    deactivateEditMode() {
        this.setState({
            editMode: false
        })
    }
    render() {
        return (
            <div>
                <br></br>
                {!this.state.editMode &&
                <div>
                    {/**
                     <span onDoubleClick={this.activateEditMode}>{this.props.status}</span>
                     такое можно было бы использовать, если activateEditMode имел бы синтаксис как в закомментированной версии
                     этого метода. Но так как там другой вид - нужно вписать вызов вместе с bind:
                     <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                     */}
                    <span onClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                </div>
                }
                {this.state.editMode &&
                <div>
                    {/**
                     onBlur срабатывает, когда нет фокуса на элементе, то есть на него навели и потом убрали мышку

                     Раньше, чтобы навести фокус на элемент - нужно было создавать ref. Теперь есть свойство которое автоматически
                     использует фокус, когда элемент отображается на странице
                     autoFocus={true}
                     */}
                    <input autoFocus={true} onBlur={this.deactivateEditMode.bind(this)} value={this.props.status}/>
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;