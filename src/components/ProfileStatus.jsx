import React from 'react';

class ProfileStatus extends React.Component {
    state = {
        editMode: false,
        status: this.props.status
    }

    /**
     * Если бы этот метод имел бы вот такой синтаксис - тогда его не нужно было бы bind'ить
    activateEditMode = () => {
        alert('hey');
        this.state.editMode = true;
    }
*/

    activateEditMode = () => {
        this.setState({
            editMode: true
        });//специальный метод по апдейту state. Причем как локального, так видимо и любого другого.
        //  this.forceUpdate();этого метода лучше избегать, но этот метод говорить React перерисовать компоненту,
        //если state изменился. Потому что даже если state меняется - это не дает гарантии, что поменяется веб элемент
        //со span на input. Но если мы используем всстроенный в react setState метод - то этот метод уже и не нужен.
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status);
    }

    onStatusChange = (e) => {
        this.setState({
            status: e.currentTarget.value
        })
        //читает текущее значение введенное в поле
        //и потом обновляет локальны state статуса этим текущим статусом
    }

    /**
     * @param prevProps
     * @param prevState
     * ^^^ Обязательно приходят сюда.

     * Если state изменился - вызвался render. render вызывается вместе со state,
     * и только после этого здесь можно достучаться до нового state/props. Причем при вызове этого метода
     * preProps = false, а this.state здесь был бы равен true. То есть state имел бы значение
     */
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.status !== this.props.status ) {
            this.setState({
                status: this.props.status
            })
        }
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
                     этого метода. Но так как там другой вид (activateEditMode (){}) - нужно вписать вызов вместе с bind:
                     <span onDoubleClick={this.activateEditMode.bind(this)}>{this.props.status}</span>
                     */}
                    <span onClick={this.activateEditMode}>{this.props.status || 'Enter your status here'}</span>
                    { /*это дефолтный статус. Он должен быть равен только this.props.status - то есть значению приходящему из серва,
                    но так как если он равен нулю - и у нас нету платной подписки - статус тогда просто тупо не приходит и все. Решение - добавить сюда
                    какую-то надпись чтобы она хоть была на странице и все*/}
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
                    <input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
                </div>
                }
            </div>
        )
    }
}

export default ProfileStatus;